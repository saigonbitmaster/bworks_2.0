// todo/dto/update-todo.dto.ts
import { BasePostJobDto } from './base.dto';

export class UpdatePostJobDto extends BasePostJobDto {
  completedAt: Date;
}
