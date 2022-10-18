import { Model } from 'mongoose';
import { CreatePostJobDto } from './dto/create.dto';
import { UpdatePostJobDto } from './dto/update.dto';
import { PostJob, PostJobDocument } from './schemas/schema';
import { User, UserDocument } from '../user/schemas/user.schema';
import { RaList, MongooseQuery } from '../flatworks/types/types';
export declare class PostJobService {
    private readonly model;
    private readonly userModel;
    constructor(model: Model<PostJobDocument>, userModel: Model<UserDocument>);
    findAll(query: MongooseQuery): Promise<RaList>;
    findOne(id: string): Promise<PostJob>;
    create(createPostJobDto: CreatePostJobDto, employerId: string): Promise<PostJob>;
    update(id: string, updatePostJobDto: UpdatePostJobDto, userId: string): Promise<PostJob>;
    findOneUser(id: string): Promise<User>;
    delete(id: string, userId: string): Promise<PostJob>;
}
