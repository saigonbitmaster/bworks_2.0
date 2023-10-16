import { SkillService } from './../skill/service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostJobDto } from './dto/create.dto';
import { UpdatePostJobDto } from './dto/update.dto';
import { PostJob, PostJobDocument } from './schemas/schema';
import { User, UserDocument } from '../user/schemas/user.schema';
import { RaList, MongooseQuery } from '../flatworks/types/types';
import {
  jobScript,
  jobDashboardScript,
  jobMonthlyScript,
} from '../flatworks/dbcripts/aggregate.scripts';
import * as moment from 'moment';
import { UserService } from '../user/user.service';
import { rankSkills } from '../flatworks/logics/rank';

@Injectable()
export class PostJobService {
  constructor(
    @InjectModel(PostJob.name) private readonly model: Model<PostJobDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly userService: UserService,
    private readonly skillService: SkillService,
  ) {}

  async getMonthlyJobReport(queryType, userId): Promise<any> {
    const toDate = moment().toDate();
    const fromDate = moment().subtract(1, 'year').toDate();

    const months = [];
    for (let i = 0; i < 12; i++) {
      const month = moment().subtract(i, 'month').format('M-YYYY').toString();
      const shortYear = moment()
        .subtract(i, 'month')
        .format('MM-YY')
        .toString();
      const date = moment().subtract(i, 'month').toDate();
      months.push({ _id: month, shortYear, date });
    }

    const aggregateScript = jobMonthlyScript(
      queryType,
      userId,
      fromDate,
      toDate,
    );
    const _result = await this.model.aggregate(aggregateScript);

    const emptyRecord = {
      _id: '',
      date: '',
      numberOfPostedJobs: 0,
      numberOfBids: 0,
      sumBidsAmounts: 0,
      numberOfPaidJobs: 0,
      numberOfCompletedJobs: 0,
    };

    const result = months.map((item) => {
      const jobItem = _result.find((jobItem) => jobItem._id == item._id);
      if (jobItem) {
        return { ...jobItem, shortYear: item.shortYear };
      }

      return { ...emptyRecord, ...item };
    });

    return result.reverse();
  }

  async getJobDashboard(): Promise<any> {
    const toDate = moment().toDate();
    const fromDate = moment().subtract(1, 'year').toDate();

    const months = [];
    for (let i = 0; i < 12; i++) {
      const month = moment().subtract(i, 'month').format('M-YYYY').toString();
      const shortYear = moment()
        .subtract(i, 'month')
        .format('MM-YY')
        .toString();
      const date = moment().subtract(i, 'month').toDate();
      months.push({ _id: month, shortYear, date });
    }

    const aggregateScript = jobDashboardScript(fromDate, toDate);
    const _result = await this.model.aggregate(aggregateScript);

    const emptyRecord = {
      _id: '',
      date: '',
      numberOfPostedJobs: 0,
      numberOfBids: 0,
      sumBidsAmounts: 0,
      numberOfPaidJobs: 0,
      numberOfCompletedJobs: 0,
    };

    const result = months.map((item) => {
      const jobItem = _result.find((jobItem) => jobItem._id == item._id);
      if (jobItem) {
        return { ...jobItem, shortYear: item.shortYear };
      }

      return { ...emptyRecord, ...item };
    });

    return result.reverse();
  }

  async getJobReports(queryType: string, userId: string): Promise<any> {
    const aggregateScript = jobScript(queryType, userId);
    const result = await this.model.aggregate(aggregateScript);
    if (result && result.length) {
      return result[0];
    }

    return {};
  }

  async findAll(query: MongooseQuery, userId = null): Promise<RaList> {
    //include employer & skill to text search
    if (query.filter.$text?.$search) {
      const $or = query.filter.$or || [];
      let users = (await this.userService.findAllRaw(
        {
          $text: { $search: query.filter.$text?.$search },
        },
        { _id: 1 },
      )) as any;

      users = users.map((item) => item._id.toString());
      users.length > 0 && !query.filter.employerId
        ? $or.push({ employerId: { $in: users } })
        : null;

      let skills = (await this.skillService.findAllRaw(
        {
          $text: { $search: query.filter.$text?.$search },
        },
        { _id: 1 },
      )) as any;

      skills = skills.map((item) => item._id.toString());

      skills.length > 0 && !query.filter.skills
        ? $or.push({ skills: { $elemMatch: { $in: skills } } })
        : null;

      $or.push({ $text: query.filter.$text });
      query.filter.$or = $or;
      delete query.filter.$text;
    }

    const count = await this.model.find(query.filter).count().exec();

    const data = (await this.model
      .find(query.filter)
      .sort(query.sort)
      .skip(query.skip)
      .limit(query.limit)
      .exec()) as any;

    //return list jobs with top 10 matched job seekers for a posted job [{userId: xxx, matchRate: number}]
    const users = (await this.userService.findAllRaw()) as any;

    const jobSeeker = await this.userService.findById(userId);
    let _data = data;
    if (query.filter.queryType === 'employer') {
      _data = data.map((item) => {
        const matchUsers = users.map((user) => ({
          userId: user._id.toString(),
          username: user.username,
          matchRate: rankSkills(user.skills, item.skills),
        }));

        //get top 10 matched users with rate > 0
        matchUsers.sort((a, b) => b.matchRate - a.matchRate);
        const topMatchUsers = matchUsers
          .filter((user) => user.matchRate > 0)
          .slice(0, 10);

        return { ...item._doc, matchUsers: topMatchUsers };
      });

      //sort number of matched users
      const sortFn = (a, b) => {
        const sort =
          query.sort.matchUsers === 1
            ? a.matchUsers.length - b.matchUsers.length
            : query.sort.matchUsers === -1
            ? b.matchUsers.length - a.matchUsers.length
            : null;
        return sort;
      };
      _data.sort(sortFn);
    }

    if (query.filter.queryType === 'jobSeeker') {
      const dataUsers = data.map((item) => {
        const matchUsers = users
          .filter((u) => u._id.toString() !== userId)
          .map((user) => ({
            userId: user._id.toString(),
            username: user.username,
            matchRate: rankSkills(user.skills, item.skills),
          }));

        //get top 10 matched users with rate > 0
        matchUsers.sort((a, b) => b.matchRate - a.matchRate);
        const topMatchUsers = matchUsers
          .filter((user) => user.matchRate > 0)
          .slice(0, 10);

        return { ...item._doc, matchUsers: topMatchUsers };
      });

      //sort number of matched users
      const sortFn1 = (a, b) => {
        const sort =
          query.sort.matchUsers === 1
            ? a.matchUsers.length - b.matchUsers.length
            : query.sort.matchUsers === -1
            ? b.matchUsers.length - a.matchUsers.length
            : null;
        return sort;
      };
      dataUsers.sort(sortFn1);

      _data = dataUsers.map((item) => {
        return {
          ...item,
          matchUsers: item.matchUsers,
          matchRate: rankSkills(jobSeeker.skills, item.skills),
        };
      });
      //sort match rate for job seeker query
      const sortFn = (a, b) => {
        const sort =
          query.sort.matchRate === 1
            ? a.rate - b.rate
            : query.sort.rate === -1
            ? b.rate - a.rate
            : null;
        return sort;
      };
      _data.sort(sortFn);
    }

    return { count: count, data: _data };
  }

  /* count for global app search
  filter = {$text: 'text'}
  filter = {$or: [{$text: 'text'}, { skills: { $elemMatch: { $in: skills } } },{ skills: { $elemMatch: { $in: skills } } },]}
  */
  async count(filter): Promise<any> {
    if (filter.$text?.$search) {
      const $or = filter.$or || [];
      let users = (await this.userService.findAllRaw(
        {
          $text: { $search: filter.$text.$search },
        },
        { _id: 1 },
      )) as any;

      users = users.map((item) => item._id.toString());
      users.length > 0 && !filter.employerId
        ? $or.push({ employerId: { $in: users } })
        : null;

      let skills = (await this.skillService.findAllRaw(
        {
          $text: { $search: filter.$text.$search },
        },
        { _id: 1 },
      )) as any;

      skills = skills.map((item) => item._id.toString());

      skills.length > 0 && !filter.skills
        ? $or.push({ skills: { $elemMatch: { $in: skills } } })
        : null;

      $or.push({ $text: filter.$text });
      filter.$or = $or;
      delete filter.$text;
    }
    return await this.model.find(filter).count().exec();
  }

  async findRefAll(): Promise<RaList> {
    const data = await this.model.find().exec();
    return { count: 0, data: data };
  }

  async findOne(id: string): Promise<PostJob> {
    return await this.model.findById(id).exec();
  }

  async findById(id: string): Promise<PostJob> {
    return await this.model.findById(id).exec();
  }

  async create(
    createPostJobDto: CreatePostJobDto,
    employerId: string,
  ): Promise<PostJob> {
    return await new this.model({
      ...createPostJobDto,
      createdAt: new Date(),
      employerId: employerId,
    }).save();
  }

  async update(
    id: string,
    updatePostJobDto: UpdatePostJobDto,
    userId: string,
  ): Promise<PostJob> {
    const record: PostJob = await this.model.findById(id).exec();
    if (record.employerId !== userId) {
      throw new Error('This is not your record');
    }
    return await this.model.findByIdAndUpdate(id, updatePostJobDto).exec();
  }

  async approve(
    id: string,
    updatePostJobDto: UpdatePostJobDto,
  ): Promise<PostJob> {
    return await this.model.findByIdAndUpdate(id, updatePostJobDto).exec();
  }

  async findOneUser(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }
  async delete(id: string, userId: string): Promise<PostJob> {
    const record: PostJob = await this.model.findById(id).exec();
    if (record.employerId !== userId) {
      throw new Error('This is not your record');
    }
    return await this.model.findByIdAndDelete(id).exec();
  }

  //cms get
  async findAllCms(query: MongooseQuery): Promise<RaList> {
    const count = await this.model.find(query.filter).count().exec();

    const data = (await this.model
      .find(query.filter)
      .sort(query.sort)
      .skip(query.skip)
      .limit(query.limit)
      .exec()) as any;

    //return list jobs with top 10 matched job seekers for posted jobs
    const users = (await this.userService.findAllRaw()) as any;

    const _data = data.map((item) => {
      const matchUsers = users.map((user) => ({
        userId: user._id.toString(),
        username: user.username,
        matchRate: rankSkills(user.skills, item.skills),
      }));

      //get top 10 matched users with rate > 0
      matchUsers.sort((a, b) => b.matchRate - a.matchRate);
      const topMatchUsers = matchUsers
        .filter((user) => user.matchRate > 0)
        .slice(0, 10);

      return { ...item._doc, matchUsers: topMatchUsers };
    });

    //sort number of matched users
    const sortFn = (a, b) => {
      const sort =
        query.sort.matchUsers === 1
          ? a.matchUsers.length - b.matchUsers.length
          : query.sort.matchUsers === -1
          ? b.matchUsers.length - a.matchUsers.length
          : null;
      return sort;
    };
    _data.sort(sortFn);

    return { count: count, data: _data };
  }
}
