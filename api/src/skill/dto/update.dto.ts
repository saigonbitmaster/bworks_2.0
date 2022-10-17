// todo/dto/update-todo.dto.ts
import { BaseSkillDto } from './base.dto';

export class UpdateSkillDto extends BaseSkillDto {
  completedAt: Date;
}
