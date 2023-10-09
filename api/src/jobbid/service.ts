import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateJobBidDto } from './dto/create.dto';
import { UpdateJobBidDto } from './dto/update.dto';
import { JobBid, JobBidDocument } from './schemas/schema';
import { User, UserDocument } from '../user/schemas/user.schema';
import { PostJob, PostJobDocument } from '../postjob/schemas/schema';
import { RaList, MongooseQuery } from '../flatworks/types/types';
import { rankJobBid } from '../flatworks/logics/rank';
import { UserService } from '../user/user.service';
import { PostJobService } from '../postJob/service';

@Injectable()
export class JobBidService {
  constructor(
    @InjectModel(JobBid.name) private readonly model: Model<JobBidDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(PostJob.name)
    private readonly postJobModel: Model<PostJobDocument>,
    private readonly userService: UserService,
    private readonly postJobService: PostJobService,
  ) {}

  async findAll(query: MongooseQuery): Promise<RaList> {
    const count = await this.model.find(query.filter).count().exec();
    //fix return all when limit = 0 for global search service
    if (query.limit <= 0) {
      return {
        data: [],
        count: count,
      };
    }
    const data = await this.model
      .find(query.filter)
      .sort(query.sort)
      .skip(query.skip)
      .limit(query.limit)
      .exec();

    //rank applications before return
    const jobSeekers = await Promise.all(
      data.map(async (i) => {
        const jobSeeker = (await this.userService.findById(
          i.jobSeekerId,
        )) as any;
        return jobSeeker;
      }),
    );
    const jobs = await Promise.all(
      data.map(async (i) => {
        const job = (await this.postJobService.findOne(i.jobId)) as any;
        return job;
      }),
    );

    const _data = data.map((item) => {
      const job = jobs.find(
        (jobItem) => jobItem._doc._id.toString() === item.jobId,
      );

      const jobSeeker = jobSeekers.find(
        (jobItem) => jobItem._doc._id.toString() === item.jobSeekerId,
      );

      const rate = rankJobBid(
        jobSeeker._doc.skills || [],
        job._doc.skills || [],
        job._doc.minBidValue || 0,
        job._doc.budget || 0,
        item.bidValue || 0,
        item.hasPrototype || false,
      );
      item.rate = rate;
      return item;
    });

    //sort rate for client query
    const sortFn = (a, b) => {
      const sort =
        query.sort.rate === 1
          ? a.rate - b.rate
          : query.sort.rate === -1
          ? b.rate - a.rate
          : null;
      return sort;
    };
    _data.sort(sortFn);

    return {
      count: count,
      data: _data,
    };
  }

  async findAllRaw(query): Promise<any> {
    return await this.model.find(query);
  }

  async findOne(id: string): Promise<JobBid> {
    return await this.model.findById(id).exec();
  }

  async create(
    createJobBidDto: CreateJobBidDto,
    jobSeekerId: string,
  ): Promise<JobBid> {
    const postJob = await this.postJobModel
      .findById(createJobBidDto.jobId)
      .exec();

    return await new this.model({
      ...createJobBidDto,
      createdAt: new Date(),
      jobSeekerId: jobSeekerId,
      employerId: postJob.employerId,
    }).save();
  }

  async update(
    id: string,
    updateJobBidDto: UpdateJobBidDto,
    userId: string,
  ): Promise<JobBid> {
    const record: JobBid = await this.model.findById(id).exec();
    //selected bid will not able to change the requested budget
    if (record.isSelected) {
      delete updateJobBidDto['bidValue'];
    }
    //emp has right to select, complete & update sign tx for the bid only
    if (record.employerId === userId) {
      const { isSelected, isSignedTx, isCompleted } = updateJobBidDto;
      const updateData = {} as any;
      isSelected !== undefined
        ? (updateData.isSelected = isSelected)
        : isSignedTx !== undefined
        ? (updateData.isSignedTx = isSignedTx)
        : isCompleted !== undefined
        ? (updateData.isCompleted = isCompleted)
        : null;
      return await this.model
        .findByIdAndUpdate(id, { isSelected, isSignedTx, isCompleted })
        .exec();
    }
    if (record.jobSeekerId !== userId) {
      throw new Error('This is not your record');
    }

    return await this.model.findByIdAndUpdate(id, updateJobBidDto).exec();
  }

  async updateByBackgroundJob(
    id: string,
    updateJobBidDto: UpdateJobBidDto,
  ): Promise<JobBid> {
    return await this.model.findByIdAndUpdate(id, updateJobBidDto).exec();
  }

  async findOneUser(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }
  async delete(id: string, userId: string): Promise<JobBid> {
    const record: JobBid = await this.model.findById(id).exec();
    if (record.jobSeekerId !== userId) {
      throw new Error('This is not your record');
    }
    if (record.isSelected) {
      throw new Error('Can not delete the selected application');
    }

    return await this.model.findByIdAndDelete(id).exec();
  }
}
