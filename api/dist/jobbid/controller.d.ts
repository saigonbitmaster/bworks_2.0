import { CreateJobBidDto } from './dto/create.dto';
import { UpdateJobBidDto } from './dto/update.dto';
import { JobBidService } from './service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
export declare class JobBidController {
    private readonly service;
    private readonly jwtService;
    constructor(service: JobBidService, jwtService: JwtService);
    getByEmployer(res: any, query: any, request: Request): Promise<any>;
    find(id: string): Promise<import("./schemas/schema").JobBid>;
    create(createJobBidDto: CreateJobBidDto, request: Request): Promise<import("./schemas/schema").JobBid>;
    update(id: string, updateJobBidDto: UpdateJobBidDto, request: Request): Promise<import("./schemas/schema").JobBid>;
    delete(id: string, request: Request): Promise<import("./schemas/schema").JobBid>;
}
