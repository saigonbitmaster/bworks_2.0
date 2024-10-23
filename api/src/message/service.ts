import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMessageDto } from './dto/create.dto';
import { UpdateMessageDto } from './dto/update.dto';
import { Message, MessageDocument } from './schemas/schema';
import { RaList, MongooseQuery } from '../flatworks/types/types';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private readonly model: Model<MessageDocument>,
  ) {}

  async findAll(query: MongooseQuery): Promise<RaList> {
    const count = await this.model.find(query.filter).count().exec();
    const data = await this.model
      .find(query.filter)
      .sort(query.sort)
      .skip(query.skip)
      .limit(query.limit)
      .exec();

    return { count: count, data: data };
  }

  async findOne(id: string): Promise<Message> {
    return await this.model.findById(id).exec();
  }

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    return await new this.model({
      ...createMessageDto,
      createdAt: new Date(),
    }).save();
  }

  async update(
    id: string,
    updateMessageDto: UpdateMessageDto,
  ): Promise<Message> {
    return await this.model.findByIdAndUpdate(id, updateMessageDto).exec();
  }

  async delete(id: string): Promise<Message> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
