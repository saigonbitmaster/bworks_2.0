// todo/dto/update-todo.dto.ts
import { BaseAdminWalletDto } from './base.dto';

export class UpdateAdminWalletDto extends BaseAdminWalletDto {
  completedAt: Date;
}
