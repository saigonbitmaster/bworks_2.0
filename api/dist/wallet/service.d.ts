import { Model } from 'mongoose';
import { CreateWalletDto } from './dto/create.dto';
import { UpdateWalletDto } from './dto/update.dto';
import { Wallet, WalletDocument } from './schemas/schema';
import { RaList, MongooseQuery } from '../flatworks/types/types';
export declare class WalletService {
    private readonly model;
    constructor(model: Model<WalletDocument>);
    findAll(query: MongooseQuery): Promise<RaList>;
    findOne(id: string): Promise<Wallet>;
    findByUser(userId: string): Promise<Wallet>;
    create(createWalletDto: CreateWalletDto): Promise<Wallet>;
    update(id: string, updateWalletDto: UpdateWalletDto): Promise<Wallet>;
    delete(id: string): Promise<Wallet>;
}
