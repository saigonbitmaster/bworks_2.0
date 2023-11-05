// todo/dto/update-todo.dto.ts
import { BaseSettingDto } from './base.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateSettingDto extends PartialType(BaseSettingDto) {
  completedAt?: Date;
}
