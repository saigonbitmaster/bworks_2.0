import { BaseMessageDto } from './base.dto';

export class UpdateMessageDto extends BaseMessageDto {
  completedAt: Date;
}
