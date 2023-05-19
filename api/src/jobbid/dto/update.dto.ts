// todo/dto/update-todo.dto.ts
import { BaseJobBidDto } from './base.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateJobBidDto extends PartialType(BaseJobBidDto) {
  completedAt: Date;
}
