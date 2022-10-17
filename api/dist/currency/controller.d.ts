import { CreateCurrencyDto } from './dto/create.dto';
import { UpdateCurrencyDto } from './dto/update.dto';
import { CurrencyService } from './service';
export declare class CurrencyController {
    private readonly service;
    constructor(service: CurrencyService);
    index(res: any, query: any): Promise<any>;
    find(id: string): Promise<import("./schemas/schema").Currency>;
    create(createCurrencyDto: CreateCurrencyDto): Promise<import("./schemas/schema").Currency>;
    update(id: string, updateCurrencyDto: UpdateCurrencyDto): Promise<import("./schemas/schema").Currency>;
    delete(id: string): Promise<import("./schemas/schema").Currency>;
}
