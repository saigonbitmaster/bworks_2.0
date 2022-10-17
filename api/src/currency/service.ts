import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCurrencyDto } from './dto/create.dto';
import { UpdateCurrencyDto } from './dto/update.dto';
import { Currency, CurrencyDocument } from './schemas/schema';
import { raList } from '../flatworks/types';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectModel(Currency.name) private readonly model: Model<CurrencyDocument>,
  ) {}

  async findAll(filter, sort, skip, limit): Promise<raList> {
    const count = await this.model.find(filter).count().exec();
    const data = await this.model
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec();
    const result = { count: count, data: data };
    return result;
  }

  async findOne(id: string): Promise<Currency> {
    return await this.model.findById(id).exec();
  }

  async create(createCurrencyDto: CreateCurrencyDto): Promise<Currency> {
    const employeeId = '634160d80609134ad2fa5efa';

    return await new this.model({
      ...createCurrencyDto,
      createdAt: new Date(),
      employeeId: employeeId,
    }).save();
  }

  async update(id: string, updateCurrencyDto: UpdateCurrencyDto): Promise<Currency> {
    return await this.model.findByIdAndUpdate(id, updateCurrencyDto).exec();
  }

  async delete(id: string): Promise<Currency> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
