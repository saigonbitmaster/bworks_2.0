import { Model } from 'mongoose';
import { CreateJobBidDto } from './dto/create.dto';
import { UpdateJobBidDto } from './dto/update.dto';
import { JobBid, JobBidDocument } from './schemas/schema';
import { User, UserDocument } from '../user/schemas/user.schema';
import { PostJobDocument } from '../postjob/schemas/schema';
import { RaList, MongooseQuery } from '../flatworks/types/types';
export declare class JobBidService {
    private readonly model;
    private readonly userModel;
    private readonly postJobModel;
    constructor(model: Model<JobBidDocument>, userModel: Model<UserDocument>, postJobModel: Model<PostJobDocument>);
    findAll(query: MongooseQuery): Promise<RaList>;
    findOne(id: string): Promise<JobBid>;
    create(createJobBidDto: CreateJobBidDto, jobSeekerId: string): Promise<JobBid>;
    update(id: string, updateJobBidDto: UpdateJobBidDto, userId: string): Promise<JobBid>;
    findOneUser(id: string): Promise<User>;
    delete(id: string, userId: string): Promise<JobBid>;
}
