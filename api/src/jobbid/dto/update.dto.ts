// todo/dto/update-todo.dto.ts
import { BaseJobBidDto } from './base.dto';

export class UpdateJobBidDto extends BaseJobBidDto {
  completedAt: Date;
}
