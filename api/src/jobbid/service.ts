import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateJobBidDto } from './dto/create.dto';
import { UpdateJobBidDto } from './dto/update.dto';
import { JobBid, JobBidDocument } from './schemas/schema';
import { User } from '../user/schemas/user.schema';
import { RaList, MongooseQuery } from '../flatworks/types/types';
import { rankJobBid } from '../flatworks/logics/rank';
import { UserService } from '../user/user.service';
import { PostJobService } from '../postJob/service';
import { MessageDto } from './dto/message.dto';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from '../mail/mail.service';
import { EventsService } from '../events/service';

@Injectable()
export class JobBidService {
  constructor(
    @InjectModel(JobBid.name) private readonly model: Model<JobBidDocument>,
    private readonly userService: UserService,
    private readonly postJobService: PostJobService,
    private readonly mailService: MailService,
    private readonly eventsService: EventsService,
  ) {}

  async findAll(query: MongooseQuery): Promise<RaList> {
    //include skills and users to fullText search
    if (query.filter.$text) {
      const $or = query.filter.$or || [];
      let users = (await this.userService.findAllRaw(
        {
          $text: { $search: query.filter.$text.$search },
        },
        { _id: 1 },
      )) as any;

      users = users.map((item) => item._id.toString());
      users.length > 0 && !query.filter.employerId
        ? $or.push({ employerId: { $in: users } })
        : null;

      users.length > 0 && !query.filter.jobSeekerId
        ? $or.push({ jobSeekerId: { $in: users } })
        : null;

      $or.push({ $text: query.filter.$text });
      query.filter.$or = $or;
      delete query.filter.$text;
    }

    const count = await this.model.find(query.filter).count().exec();
    const data = await this.model
      .find(query.filter)
      .sort(query.sort)
      .skip(query.skip)
      .limit(query.limit)
      .select(query.select)
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

  //count for global app search
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

      users.length > 0 && !filter.jobSeekerId
        ? $or.push({ jobSeekerId: { $in: users } })
        : null;

      $or.push({ $text: filter.$text });
      filter.$or = $or;
      delete filter.$text;
    }

    return await this.model.find(filter).count().exec();
  }

  async findAllRaw(query): Promise<any> {
    return await this.model.find(query);
  }

  async findOne(id: string): Promise<JobBid> {
    return await this.model.findById(id).exec();
  }

  async findById(id: string): Promise<JobBid> {
    return await this.model.findById(id).exec();
  }

  //only employer & job seeker can get detail a application
  async findOneForRest(id: string, userId: string): Promise<JobBid> {
    const jobBid = await this.model.findById(id).exec();
    if (jobBid.employerId !== userId && jobBid.jobSeekerId !== userId) {
      return null;
    }
    return jobBid;
  }

  async create(
    createJobBidDto: CreateJobBidDto,
    jobSeekerId: string,
  ): Promise<JobBid> {
    const postJob = await this.postJobService.findOne(createJobBidDto.jobId);
    const employer = await this.userService.findById(postJob.employerId);

    let result;
    try {
      result = await new this.model({
        ...createJobBidDto,
        createdAt: new Date(),
        jobSeekerId: jobSeekerId,
        employerId: postJob.employerId,
      }).save();
    } catch (err) {
      return;
    }

    //notify employer
    this.mailService.applyNotify(employer, result);

    //event notify to employer
    const userType = 'employer';
    this.eventsService.sendMessage(employer._id.toString(), 'notification', {
      type: 'job',
      message: result._id.toString(),
      userType,
    });

    return result;
  }

  async update(
    id: string,
    updateJobBidDto: UpdateJobBidDto,
    userId: string,
  ): Promise<JobBid> {
    const record: JobBidDocument = await this.model.findById(id).exec();
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

      //notify if the application is selected
      if (!record.isSelected && isSelected) {
        const jobSeeker = await this.userService.findById(record.jobSeekerId);
        this.mailService.applicationSelected(jobSeeker, record);
      }

      //employer update event notify to job seeker
      const eventUserId = record.jobSeekerId;
      const userType = 'jobSeeker';
      this.eventsService.sendMessage(eventUserId, 'notification', {
        type: 'job',
        message: record._id.toString(),
        userType,
      });

      return await this.model
        .findByIdAndUpdate(id, { isSelected, isSignedTx, isCompleted })
        .exec();
    }

    if (record.jobSeekerId !== userId) {
      throw new Error('This is not your record');
    }

    //jsk update event notify to employer
    const eventUserId = record.employerId;
    const userType = 'employer';
    this.eventsService.sendMessage(eventUserId, 'notification', {
      type: 'job',
      message: record._id.toString(),
      userType,
    });

    return await this.model.findByIdAndUpdate(id, updateJobBidDto).exec();
  }

  async createMessage(
    id: string,
    messageDto: MessageDto,
    userId: string,
  ): Promise<JobBid> {
    const jobBid = await this.model.findById(id);
    const user = await this.userService.findById(userId);
    if (userId !== jobBid.employerId && userId !== jobBid.jobSeekerId) return;

    //notify to receiver
    const eventUserId =
      jobBid.employerId === userId ? jobBid.jobSeekerId : jobBid.employerId;
    const userType = jobBid.employerId === userId ? 'jobSeeker' : 'employer';
    this.eventsService.sendMessage(eventUserId, 'notification', {
      type: 'message',
      message: jobBid._id,
      userType,
    });

    const messages = jobBid.messages
      ? [
          ...jobBid.messages,
          {
            ...messageDto,
            userId,
            createdAt: new Date(),
            id: uuidv4(),
          },
        ]
      : [{ ...messageDto, userId, createdAt: new Date(), id: uuidv4() }];

    let result;
    try {
      result = await this.model
        .findByIdAndUpdate(id, {
          messages,
        })
        .exec();
    } catch (e) {
      return;
    }
    //notify mail
    this.mailService.applicationComment(user, jobBid);
    return result;
  }

  async deleteMessage(
    id: string,
    messageId: string,
    userId: string,
  ): Promise<JobBid> {
    const jobBid = await this.model.findById(id);

    if (userId !== jobBid.employerId && userId !== jobBid.jobSeekerId) return;

    const messages = jobBid.messages;

    const message = messages.find((i) => i.id === messageId);
    if (message.userId !== userId || !message) return;

    return await this.model
      .findByIdAndUpdate(id, {
        messages: messages.filter((i) => i.id !== messageId),
      })
      .exec();
  }

  async updateByBackgroundJob(
    id: string,
    updateJobBidDto: UpdateJobBidDto,
  ): Promise<JobBid> {
    return await this.model.findByIdAndUpdate(id, updateJobBidDto).exec();
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

  //cms services
  async findAllCms(query: MongooseQuery): Promise<RaList> {
    const count = await this.model.find(query.filter).count().exec();

    const data = await this.model
      .find(query.filter)
      .sort(query.sort)
      .skip(query.skip)
      .limit(query.limit)
      .exec();

    return {
      count,
      data,
    };
  }

  async deleteCms(id: string): Promise<JobBid> {
    return await this.model.findByIdAndDelete(id).exec();
  }

  async findOneCms(id: string): Promise<JobBid> {
    return await this.model.findById(id).exec();
  }

  async approve(id: string, updateJobBidDto: UpdateJobBidDto): Promise<JobBid> {
    //cms update isApproved only
    const { isApproved } = updateJobBidDto;
    return await this.model.findByIdAndUpdate(id, { isApproved }).exec();
  }
}
