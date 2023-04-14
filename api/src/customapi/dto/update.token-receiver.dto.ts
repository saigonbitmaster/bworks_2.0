// todo/dto/update-todo.dto.ts
import { BaseTokenReceiverDto } from './base.token-receiver.dto';

export class UpdateTokenReceiverDto extends BaseTokenReceiverDto {
  completedAt: Date;
}
