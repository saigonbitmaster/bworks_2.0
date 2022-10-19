import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWalletDto } from './dto/create.dto';
import { UpdateWalletDto } from './dto/update.dto';
import { Wallet, WalletDocument } from './schemas/schema';
import { RaList, MongooseQuery } from '../flatworks/types/types';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name) private readonly model: Model<WalletDocument>,
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

  async findOne(id: string): Promise<Wallet> {
    return await this.model.findById(id).exec();
  }

  async findByUser(userId: string): Promise<Wallet> {
    return await this.model.findOne({ userId }).exec();
  }

  async create(createWalletDto: CreateWalletDto): Promise<Wallet> {
    const employeeId = '634160d80609134ad2fa5efa';

    return await new this.model({
      ...createWalletDto,
      createdAt: new Date(),
      employeeId: employeeId,
    }).save();
  }

  async update(id: string, updateWalletDto: UpdateWalletDto): Promise<Wallet> {
    return await this.model.findByIdAndUpdate(id, updateWalletDto).exec();
  }

  async delete(id: string): Promise<Wallet> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
