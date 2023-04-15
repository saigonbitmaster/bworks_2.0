import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostJobDto } from './dto/create.dto';
import { UpdatePostJobDto } from './dto/update.dto';
import { PostJob, PostJobDocument } from './schemas/schema';
import { User, UserDocument } from '../user/schemas/user.schema';
import { RaList, MongooseQuery } from '../flatworks/types/types';

@Injectable()
export class PostJobService {
  constructor(
    @InjectModel(PostJob.name) private readonly model: Model<PostJobDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
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
    return { count: count, data: data };
  }

  async findRefAll(): Promise<RaList> {
    const data = await this.model.find().exec();
    return { count: 0, data: data };
  }

  async findOne(id: string): Promise<PostJob> {
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
}
