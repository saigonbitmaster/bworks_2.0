import { Model } from 'mongoose';
import { CreateSkillDto } from './dto/create.dto';
import { UpdateSkillDto } from './dto/update.dto';
import { Skill, SkillDocument } from './schemas/schema';
import { RaList, MongooseQuery } from '../flatworks/types/types';
export declare class SkillService {
    private readonly model;
    constructor(model: Model<SkillDocument>);
    findAll(query: MongooseQuery): Promise<RaList>;
    findOne(id: string): Promise<Skill>;
    create(createSkillDto: CreateSkillDto): Promise<Skill>;
    update(id: string, updateSkillDto: UpdateSkillDto): Promise<Skill>;
    delete(id: string): Promise<Skill>;
}
