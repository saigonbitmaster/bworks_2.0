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
  Req,
} from '@nestjs/common';
import { CreateWalletDto } from './dto/create.dto';
import { UpdateWalletDto } from './dto/update.dto';
import { WalletService } from './service';
import { queryTransform, formatRaList } from '../flatworks/utils/getlist';
import { JwtService } from '@nestjs/jwt';
import { AddressDto } from './dto/address.dto';
import * as lodash from 'lodash';

@Controller('wallets')
export class WalletController {
  constructor(
    private readonly service: WalletService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  async index(@Response() res: any, @Query() query) {
    const mongooseQuery = queryTransform(query);
    const result = await this.service.findAll(mongooseQuery);
    return formatRaList(res, result);
  }

  @Get('user/userId')
  async findByUser(@Req() request) {
    const userId = lodash.get(request, 'user.userId', null);
    if (!userId) return null;
    return await this.service.findByUser(userId);
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post('parseAddress')
  async parseAddress(@Body() addressDto: AddressDto) {
    return await this.service.parseAddress(addressDto.address);
  }

  @Post()
  async create(@Body() createWalletDto: CreateWalletDto, @Req() request) {
    const userId = lodash.get(request, 'user.userId', null);
    return await this.service.create(createWalletDto, userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWalletDto: UpdateWalletDto,
    @Req() request,
  ) {
    const userId = lodash.get(request, 'user.userId', null);
    return await this.service.update(id, updateWalletDto, userId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() request) {
    const userId = lodash.get(request, 'user.userId', null);
    return await this.service.delete(id, userId);
  }
}
