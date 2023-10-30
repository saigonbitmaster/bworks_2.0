import { Address } from '@emurgo/cardano-serialization-lib-asmjs';
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
    const address = createWalletDto.address;
    const info = (await this.parseAddress(address)) as any;
    console.log(info);

    try {
      return await new this.model({
        ...createWalletDto,
        createdAt: new Date(),
        pKeyHash: info.pKeyHash,
        pKeyHashBech32: info.pKeyHashBech32,
        userId,
      }).save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async parseAddress(address: string): Promise<any> {
    const isAddress = await validateAddress(address);
    if (!isAddress) {
      throw new BadRequestException(
        'Invalid Cardano wallet address, please try another address',
      );
    }
    const info = (await inspectAddress(address)) as any;
    return {
      pKeyHash: info.spending_key_hash,
      pKeyHashBech32: info.spending_key_hash_bech32,
      address: address,
    };
  }

  async update(id: string, updateWalletDto: UpdateWalletDto): Promise<Wallet> {
    const info = (await this.parseAddress(updateWalletDto.address)) as any;

    try {
      return await this.model
        .findByIdAndUpdate(id, {
          ...updateWalletDto,
          pKeyHash: info.pKeyHash,
          pKeyHashBech32: info.pKeyHashBech32,
        })
        .exec();
    } catch (err) {
      throw new BadRequestException(
        'Address is already in use. Please try another address',
      );
    }
  }

  async delete(id: string, userId: string): Promise<Wallet> {
    const wallet = await this.findByUser(userId);
    if (wallet.userId !== userId || !userId) {
      throw new Error('Not your wallet');
    }
    return await this.model.findByIdAndDelete(id).exec();
  }
}
