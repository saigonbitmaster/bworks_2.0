// todo/dto/update-todo.dto.ts
import { BaseJobTaskDto } from './base.dto';

export class UpdateJobTaskDto extends BaseJobTaskDto {
  completedAt: Date;
}
