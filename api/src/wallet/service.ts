import { UserService } from './../user/user.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWalletDto } from './dto/create.dto';
import { UpdateWalletDto } from './dto/update.dto';
import { Wallet, WalletDocument } from './schemas/schema';
import { RaList, MongooseQuery } from '../flatworks/types/types';
import { inspectAddress } from 'cardano-addresses';
import { AddressDto } from './dto/address.dto';
import { validateAddress } from '../flatworks/utils/cardano';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name) private readonly model: Model<WalletDocument>,
    private readonly userService: UserService,
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

  //use for other internal service. no sort, skip & limit
  async findAllRaw(filter = {}): Promise<any[]> {
    return await this.model.find(filter).exec();
  }

  async findOne(id: string): Promise<Wallet> {
    return await this.model.findById(id).exec();
  }

  async findByUser(userId: string): Promise<Wallet> {
    return await this.model.findOne({ userId }).exec();
  }

  async create(
    createWalletDto: CreateWalletDto,
    userId: string,
  ): Promise<Wallet> {
    console.log(createWalletDto, userId);
    const address = createWalletDto.address;
    const info = (await inspectAddress(address)) as any;
    return await new this.model({
      ...createWalletDto,
      createdAt: new Date(),
      pKeyHash: info.spending_key_hash,
      pKeyHashBech32: info.spending_key_hash_bech32,
      userId,
    }).save();
  }

  async parseAddress(address: string): Promise<any> {
    const isAddress = await validateAddress(address);
    if (!isAddress) {
      throw new BadRequestException('Invalid address');
    }
    const info = (await inspectAddress(address)) as any;
    return {
      pKeyHash: info.spending_key_hash,
      pKeyHashBech32: info.spending_key_hash_bech32,
      address: address,
    };
  }

  async update(id: string, updateWalletDto: UpdateWalletDto): Promise<Wallet> {
    const info = (await inspectAddress(updateWalletDto.address)) as any;
    return await this.model
      .findByIdAndUpdate(id, {
        ...updateWalletDto,
        pKeyHash: info.spending_key_hash,
        pKeyHashBech32: info.spending_key_hash_bech32,
      })
      .exec();
  }

  async delete(id: string): Promise<Wallet> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
