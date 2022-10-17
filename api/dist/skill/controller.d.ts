import { CreateSkillDto } from './dto/create.dto';
import { UpdateSkillDto } from './dto/update.dto';
import { SkillService } from './service';
export declare class SkillController {
    private readonly service;
    constructor(service: SkillService);
    index(res: any, query: any): Promise<any>;
    find(id: string): Promise<import("./schemas/schema").Skill>;
    create(createSkillDto: CreateSkillDto): Promise<import("./schemas/schema").Skill>;
    update(id: string, updateSkillDto: UpdateSkillDto): Promise<import("./schemas/schema").Skill>;
    delete(id: string): Promise<import("./schemas/schema").Skill>;
}
