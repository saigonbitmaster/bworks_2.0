// todo/dto/update-todo.dto.ts
import { BaseWalletDto } from './base.dto';

export class UpdateWalletDto extends BaseWalletDto {
  completedAt: Date;
}
