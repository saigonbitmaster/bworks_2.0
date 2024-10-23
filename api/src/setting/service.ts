import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSettingDto } from './dto/create.dto';
import { UpdateSettingDto } from './dto/update.dto';
import { Setting, SettingDocument } from './schemas/schema';
import { RaList, MongooseQuery } from '../flatworks/types/types';

@Injectable()
export class SettingService {
  constructor(
    @InjectModel(Setting.name) private readonly model: Model<SettingDocument>,
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

  //count for global app search
  async count(filter): Promise<any> {
    return await this.model.find(filter).count().exec();
  }

  //raw search for other services
  async findAllRaw(filter = {}, select = {}): Promise<Setting[]> {
    return this.model.find(filter).select(select).exec();
  }

  async findOne(id: string): Promise<Setting> {
    return await this.model.findById(id).exec();
  }

  async create(createSettingDto: CreateSettingDto): Promise<Setting> {
    const employeeId = '634160d80609134ad2fa5efa';

    return await new this.model({
      ...createSettingDto,
      createdAt: new Date(),
      employeeId: employeeId,
    }).save();
  }

  async update(
    id: string,
    updateSettingDto: UpdateSettingDto,
  ): Promise<Setting> {
    return await this.model.findByIdAndUpdate(id, updateSettingDto).exec();
  }

  async delete(id: string): Promise<Setting> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
