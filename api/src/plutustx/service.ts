import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlutusTxDto } from './dto/create.dto';
import { UpdatePlutusTxDto } from './dto/update.dto';
import { PlutusTx, PlutusTxDocument } from './schemas/schema';
import { RaList, MongooseQuery } from '../flatworks/types/types';

@Injectable()
export class PlutusTxService {
  constructor(
    @InjectModel(PlutusTx.name) private readonly model: Model<PlutusTxDocument>,
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

  async findOne(id: string): Promise<PlutusTx> {
    return await this.model.findById(id).exec();
  }

  async create(createPlutusTxDto: CreatePlutusTxDto): Promise<PlutusTx> {
    return await new this.model({
      ...createPlutusTxDto,
      createdAt: new Date(),
    }).save();
  }

  async update(
    id: string,
    updatePlutusTxDto: UpdatePlutusTxDto,
  ): Promise<PlutusTx> {
    return await this.model.findByIdAndUpdate(id, updatePlutusTxDto).exec();
  }

  async delete(id: string): Promise<PlutusTx> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
