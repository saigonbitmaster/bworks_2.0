// todo/dto/update-todo.dto.ts
import { BaseCampaignDto } from './base.campaign.dto';

export class UpdateCampaignDto extends BaseCampaignDto {
  completedAt: Date;
}
