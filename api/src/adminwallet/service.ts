import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAdminWalletDto } from './dto/create.dto';
import { UpdateAdminWalletDto } from './dto/update.dto';
import { AdminWallet, AdminWalletDocument } from './schemas/schema';
import { RaList, MongooseQuery } from '../flatworks/types/types';
import { inspectAddress } from 'cardano-addresses';

@Injectable()
export class AdminWalletService {
  constructor(
    @InjectModel(AdminWallet.name)
    private readonly model: Model<AdminWalletDocument>,
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

  async findOne(id: string): Promise<AdminWallet> {
    return await this.model.findById(id).exec();
  }

  async findByUser(userId: string): Promise<AdminWallet> {
    return await this.model.findOne({ userId }).exec();
  }

  async create(
    createAdminWalletDto: CreateAdminWalletDto,
  ): Promise<AdminWallet> {
    const address = createAdminWalletDto.address;

    const info = (await inspectAddress(address)) as any;
    return await new this.model({
      ...createAdminWalletDto,
      createdAt: new Date(),
      pKeyHash: info.spending_key_hash,
      pKeyHashBech32: info.spending_key_hash_bech32,
    }).save();
  }

  async update(
    id: string,
    updateAdminWalletDto: UpdateAdminWalletDto,
  ): Promise<AdminWallet> {
    return await this.model.findByIdAndUpdate(id, updateAdminWalletDto).exec();
  }

  async delete(id: string): Promise<AdminWallet> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
