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
  UseGuards,
  BadRequestException,
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
import { Public } from '../flatworks/roles/public.api.decorator';
import { HomePageAuthGuard } from '../auth/home-page-auth.guard';
import { fetchUtxo } from '../flatworks/utils/cardano';

@Controller('public')
export class PublicController {
  constructor(
    private readonly service: PublicService,
    private readonly plutusTxService: PlutusTxService,
    private readonly postJobService: PostJobService,
  ) {}

  //job report for homepage
  @Get('jobreports')
  @Public()
  async getJobReport(@Response() res: any) {
    const result = await this.postJobService.getJobReports(null, null);
    return res.json(result);
  }

  //find utxo
  @Get('findutxo')
  @Public()
  async findUtxo(@Response() res: any, @Query() query) {
    const { scriptAddress, asset, lockedTxHash } = queryTransform(query).filter;
    if (!scriptAddress) throw new BadRequestException('No script address');
    if (!asset) throw new BadRequestException('No asset name');
    if (!lockedTxHash) throw new BadRequestException('No lockedTxHash');

    const result = await fetchUtxo(scriptAddress, asset, lockedTxHash);
    if (!result) throw new BadRequestException('No UTXO');

    return res.json(result);
  }

  //payment report for homepage
  @Get('plutusreports')
  @Public()
  async getDashboardPlutus(@Response() res: any) {
    const result = await this.plutusTxService.getPlutusReports(null, null);
    console.log(result);
    return res.json(result);
  }

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

  @UseGuards(HomePageAuthGuard)
  @Post('tokenreceivers')
  @Public()
  async createTokenReceiver(
    @Body() createTokenReceiverDto: CreateTokenReceiverDto,
  ) {
    return await this.service.createTokenReceiver(createTokenReceiverDto);
  }

  @Get('campaigns')
  @Public()
  async indexCampaign(@Response() res: any, @Query() query) {
    const mongooseQuery = queryTransform(query);
    const result = await this.service.findAllCampaign(mongooseQuery);
    return formatRaList(res, result);
  }

  @Get('campaigns/:id')
  @Public()
  async findCampaignById(@Param('id') id: string) {
    return await this.service.findCampaignById(id);
  }
}
