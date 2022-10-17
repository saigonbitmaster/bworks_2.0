import { CreatePostJobDto } from './dto/create.dto';
import { UpdatePostJobDto } from './dto/update.dto';
import { PostJobService } from './service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
export declare class PostJobController {
    private readonly service;
    private readonly jwtService;
    constructor(service: PostJobService, jwtService: JwtService);
    index(res: any, query: any, request: Request): Promise<any>;
    find(id: string): Promise<import("./schemas/schema").PostJob>;
    create(createPostJobDto: CreatePostJobDto, request: Request): Promise<import("./schemas/schema").PostJob>;
    update(id: string, updatePostJobDto: UpdatePostJobDto, request: Request): Promise<import("./schemas/schema").PostJob>;
    delete(id: string, request: Request): Promise<import("./schemas/schema").PostJob>;
}
