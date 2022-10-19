import { CreateWalletDto } from './dto/create.dto';
import { UpdateWalletDto } from './dto/update.dto';
import { WalletService } from './service';
import { JwtService } from '@nestjs/jwt';
export declare class WalletController {
    private readonly service;
    private readonly jwtService;
    constructor(service: WalletService, jwtService: JwtService);
    index(res: any, query: any): Promise<any>;
    findByUser(request: any): Promise<import("./schemas/schema").Wallet>;
    find(id: string): Promise<import("./schemas/schema").Wallet>;
    create(createWalletDto: CreateWalletDto): Promise<import("./schemas/schema").Wallet>;
    update(id: string, updateWalletDto: UpdateWalletDto): Promise<import("./schemas/schema").Wallet>;
    delete(id: string): Promise<import("./schemas/schema").Wallet>;
}
