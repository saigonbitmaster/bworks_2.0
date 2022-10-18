import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSkillDto } from './dto/create.dto';
import { UpdateSkillDto } from './dto/update.dto';
import { Skill, SkillDocument } from './schemas/schema';
import { RaList, MongooseQuery } from '../flatworks/types/types';

@Injectable()
export class SkillService {
  constructor(
    @InjectModel(Skill.name) private readonly model: Model<SkillDocument>,
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

  async findOne(id: string): Promise<Skill> {
    return await this.model.findById(id).exec();
  }

  async create(createSkillDto: CreateSkillDto): Promise<Skill> {
    const employeeId = '634160d80609134ad2fa5efa';

    return await new this.model({
      ...createSkillDto,
      createdAt: new Date(),
      employeeId: employeeId,
    }).save();
  }

  async update(id: string, updateSkillDto: UpdateSkillDto): Promise<Skill> {
    return await this.model.findByIdAndUpdate(id, updateSkillDto).exec();
  }

  async delete(id: string): Promise<Skill> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
