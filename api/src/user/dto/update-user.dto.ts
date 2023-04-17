// todo/dto/update-todo.dto.ts
import { BaseUserDto } from './base-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(BaseUserDto) {}
