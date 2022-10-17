import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateJobBidDto } from './dto/create.dto';
import { UpdateJobBidDto } from './dto/update.dto';
import { JobBid, JobBidDocument } from './schemas/schema';
import { User, UserDocument } from '../user/schemas/user.schema';
import { PostJob, PostJobDocument } from '../postjob/schemas/schema';

import { raList, mongooseQuery } from '../flatworks/types';

@Injectable()
export class JobBidService {
  constructor(
    @InjectModel(JobBid.name) private readonly model: Model<JobBidDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(PostJob.name)
    private readonly postJobModel: Model<PostJobDocument>,
  ) {}

  async findAll(query: mongooseQuery): Promise<raList> {
    const count = await this.model.find(query.filter).count().exec();
    const data = await this.model
      .find(query.filter)
      .sort(query.sort)
      .skip(query.skip)
      .limit(query.limit)
      .exec();

    return { count: count, data: data };
  }

  async findOne(id: string): Promise<JobBid> {
    return await this.model.findById(id).exec();
  }

  async create(
    createJobBidDto: CreateJobBidDto,
    jobSeekerId: string,
  ): Promise<JobBid> {
    console.log(createJobBidDto.jobId);
    const postJob = await this.postJobModel
      .findById(createJobBidDto.jobId)
      .exec();
    console.log(createJobBidDto);

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
    if (record.jobSeekerId !== userId) {
      throw new Error('This is not your record');
    }
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
    return await this.model.findByIdAndDelete(id).exec();
  }
}
