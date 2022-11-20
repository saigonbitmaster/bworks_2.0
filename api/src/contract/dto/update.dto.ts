// todo/dto/update-todo.dto.ts
import { BaseContractDto } from './base.dto';

export class UpdateContractDto extends BaseContractDto {
  completedAt: Date;
}
