import { Model } from 'mongoose';
import { CreateSkillDto } from './dto/create.dto';
import { UpdateSkillDto } from './dto/update.dto';
import { Skill, SkillDocument } from './schemas/schema';
import { raList } from '../flatworks/types';
export declare class SkillService {
    private readonly model;
    constructor(model: Model<SkillDocument>);
    findAll(filter: any, sort: any, skip: any, limit: any): Promise<raList>;
    findOne(id: string): Promise<Skill>;
    create(createSkillDto: CreateSkillDto): Promise<Skill>;
    update(id: string, updateSkillDto: UpdateSkillDto): Promise<Skill>;
    delete(id: string): Promise<Skill>;
}
