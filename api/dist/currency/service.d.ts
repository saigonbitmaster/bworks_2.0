import { Model } from 'mongoose';
import { CreateCurrencyDto } from './dto/create.dto';
import { UpdateCurrencyDto } from './dto/update.dto';
import { Currency, CurrencyDocument } from './schemas/schema';
import { RaList, MongooseQuery } from '../flatworks/types/types';
export declare class CurrencyService {
    private readonly model;
    constructor(model: Model<CurrencyDocument>);
    findAll(query: MongooseQuery): Promise<RaList>;
    findOne(id: string): Promise<Currency>;
    create(createCurrencyDto: CreateCurrencyDto): Promise<Currency>;
    update(id: string, updateCurrencyDto: UpdateCurrencyDto): Promise<Currency>;
    delete(id: string): Promise<Currency>;
}
