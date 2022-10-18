import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCurrencyDto } from './dto/create.dto';
import { UpdateCurrencyDto } from './dto/update.dto';
import { Currency, CurrencyDocument } from './schemas/schema';
import { RaList, MongooseQuery } from '../flatworks/types/types';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectModel(Currency.name) private readonly model: Model<CurrencyDocument>,
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

  async update(
    id: string,
    updateCurrencyDto: UpdateCurrencyDto,
  ): Promise<Currency> {
    return await this.model.findByIdAndUpdate(id, updateCurrencyDto).exec();
  }

  async delete(id: string): Promise<Currency> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
