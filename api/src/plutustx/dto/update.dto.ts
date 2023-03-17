// todo/dto/update-todo.dto.ts
import { BasePlutusTxDto } from './base.dto';

export class UpdatePlutusTxDto extends BasePlutusTxDto {
  completedAt: Date;
}
