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
import { PublicService } from './public.service';
import { queryTransform, formatRaList } from '../flatworks/utils/getlist';
import { CreateCampaignDto } from './dto/create.campaign.dto';
import { UpdateCampaignDto } from './dto/update.campaign.dto';
import { PlutusTxService } from '../plutustx/service';
import * as moment from 'moment';
import { PostJobService } from '../postjob/service';

@Controller('public')
export class PublicController {
  constructor(
    private readonly service: PublicService,
    private readonly plutusTxService: PlutusTxService,
    private readonly postJobService: PostJobService,
  ) {}
  /* 
  //dashboard apis
  @Get('dashboardcards')
  async getDashboardData(@Response() res: any) {
    const result = await this.service.getDashboardData();
    return res.json(result);
  }

  //plutus dashboard chart
  @Get('dashboardplutus')
  async getDashboardPlutus(@Response() res: any) {
    const result = await this.plutusTxService.getPlutusDashboard();
    return res.json(result);
  }
  //job dashboard chart
  @Get('jobdashboard')
  async getDashboardJob(@Response() res: any) {
    const result = await this.postJobService.getJobDashboard();
    return res.json(result);
  } */

  //homepage queries
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
