import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateJobTaskDto } from './dto/create.dto';
import { UpdateJobTaskDto } from './dto/update.dto';
import { JobTask, JobTaskDocument } from './schemas/schema';
import { RaList, MongooseQuery } from '../flatworks/types/types';

@Injectable()
export class JobTaskService {
  constructor(
    @InjectModel(JobTask.name) private readonly model: Model<JobTaskDocument>,
  ) {}

  async findAll(query: MongooseQuery): Promise<RaList> {
    const count = await this.model.find(query.filter).count().exec();
    const data = await this.model
      .find(query.filter)
      .sort(query.sort)
      .skip(query.skip)
      .limit(query.limit)
      .exec();

    return { count, data };
  }
  async findOne(id: string): Promise<JobTask> {
    return await this.model.findById(id).exec();
  }

  async create(
    createJobTaskDto: CreateJobTaskDto,
    userId: string,
  ): Promise<JobTask> {
    return await new this.model({
      ...createJobTaskDto,
      creator: userId,
      createdAt: new Date(),
    }).save();
  }

  async update(
    id: string,
    updateJobTaskDto: UpdateJobTaskDto,
    userId: string,
  ): Promise<JobTask> {
    return await this.model
      .findByIdAndUpdate(id, { ...updateJobTaskDto, updater: userId })
      .exec();
  }

  async delete(id: string, userId: string): Promise<JobTask> {
    //user delete its own task only
    const task = await this.findOne(id);
    if (task.creator !== userId) {
      throw new ForbiddenException('Permission Denied');
    }
    return await this.model.findByIdAndDelete(id).exec();
  }
}
