import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateJobBidDto } from './dto/create.dto';
import { UpdateJobBidDto } from './dto/update.dto';
import { JobBid, JobBidDocument } from './schemas/schema';
import { User, UserDocument } from '../user/schemas/user.schema';
import { PostJob, PostJobDocument } from '../postjob/schemas/schema';

import { RaList, MongooseQuery } from '../flatworks/types/types';

@Injectable()
export class JobBidService {
  constructor(
    @InjectModel(JobBid.name) private readonly model: Model<JobBidDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(PostJob.name)
    private readonly postJobModel: Model<PostJobDocument>,
  ) {}

  async findAll(query: MongooseQuery): Promise<RaList> {
    const count = await this.model.find(query.filter).count().exec();
    //fix return all when limit = 0
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

    return {
      count: count,
      data: data.map((item) => {
        item.rate = 4;
        return item;
      }),
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
    //emp has right to select & update sign tx for the bid only
    if (record.employerId === userId) {
      const { isSelected, isSignedTx } = updateJobBidDto;
      const updateData = {} as any;
      isSelected !== undefined
        ? (updateData.isSelected = isSelected)
        : isSignedTx !== undefined
        ? (updateData.isSignedTx = isSignedTx)
        : null;
      return await this.model
        .findByIdAndUpdate(id, { isSelected, isSignedTx })
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
    console.log(id, updateJobBidDto);
    let a = await this.model.findByIdAndUpdate(id, updateJobBidDto).exec();
    console.log(a);
    return a;
  }

  async findOneUser(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }
  async delete(id: string, userId: string): Promise<JobBid> {
    const record: JobBid = await this.model.findById(id).exec();
    if (record.jobSeekerId !== userId) {
      throw new Error('This is not your record');
    }
    return await this.model.findByIdAndDelete(id).exec();
  }
}
