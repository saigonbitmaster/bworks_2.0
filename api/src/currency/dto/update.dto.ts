// todo/dto/update-todo.dto.ts
import { BaseCurrencyDto } from './base.dto';

export class UpdateCurrencyDto extends BaseCurrencyDto {
  completedAt: Date;
}
