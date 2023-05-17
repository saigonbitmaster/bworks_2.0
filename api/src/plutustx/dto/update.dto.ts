// todo/dto/update-todo.dto.ts
import { BasePlutusTxDto } from './base.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePlutusTxDto extends PartialType(BasePlutusTxDto) {
  completedAt: Date;
}
