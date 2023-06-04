// todo/dto/update-todo.dto.ts
import { BasePostJobDto } from './base.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePostJobDto extends PartialType(BasePostJobDto) {
  completedAt: Date;
}
