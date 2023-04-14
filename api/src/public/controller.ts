import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Response,
  Query,
} from '@nestjs/common';
import { CreateTokenReceiverDto } from './dto/create.token-receiver.dto';
import { UpdateTokenReceiverDto } from './dto/update.token-receiver.dto';
import { PublicService } from './service';
import { queryTransform, formatRaList } from '../flatworks/utils/getlist';

import { CreateCampaignDto } from './dto/create.campaign.dto';
import { UpdateCampaignDto } from './dto/update.campaign.dto';

@Controller('public')
export class PublicController {
  constructor(private readonly service: PublicService) {}

  @Get('tokenreceivers')
  async indexTokenReceiver(@Response() res: any, @Query() query) {
    const mongooseQuery = queryTransform(query);
    const result = await this.service.findAllTokenReceiver(mongooseQuery);
    return formatRaList(res, result);
  }

  @Get('tokenreceivers/:id')
  async findTokenReceiver(@Param('id') id: string) {
    return await this.service.findTokenReceiverById(id);
  }

  @Post('tokenreceivers')
  async createTokenReceiver(
    @Body() createTokenReceiverDto: CreateTokenReceiverDto,
  ) {
    return await this.service.createTokenReceiver(createTokenReceiverDto);
  }

  @Put('tokenreceivers/:id')
  async updateTokenReceiver(
    @Param('id') id: string,
    @Body() updateTokenReceiverDto: UpdateTokenReceiverDto,
  ) {
    return await this.service.updateTokenReceiver(id, updateTokenReceiverDto);
  }

  @Delete('tokenreceivers/:id')
  async deleteTokenReceiver(@Param('id') id: string) {
    return await this.service.deleteTokenReceiver(id);
  }

  @Get('campaigns')
  async indexCampaign(@Response() res: any, @Query() query) {
    const mongooseQuery = queryTransform(query);
    const result = await this.service.findAllCampaign(mongooseQuery);
    return formatRaList(res, result);
  }

  @Get('campaigns/:id')
  async findCampaignById(@Param('id') id: string) {
    return await this.service.findCampaignById(id);
  }

  @Post('campaigns')
  async createCampaign(@Body() createCampaignDto: CreateCampaignDto) {
    return await this.service.createCampaign(createCampaignDto);
  }

  @Put('campaigns/:id')
  async updateCampaign(
    @Param('id') id: string,
    @Body() updateCampaignDto: UpdateCampaignDto,
  ) {
    return await this.service.updateCampaign(id, updateCampaignDto);
  }

  @Delete('campaigns/:id')
  async deleteCampaign(@Param('id') id: string) {
    return await this.service.deleteCampaign(id);
  }
}
