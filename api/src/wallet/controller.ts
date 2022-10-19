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
  Request,
} from '@nestjs/common';
import { CreateWalletDto } from './dto/create.dto';
import { UpdateWalletDto } from './dto/update.dto';
import { WalletService } from './service';
import { queryTransform, formatRaList } from '../flatworks/utils/getlist';
import getToken from '../flatworks/utils/token';

import { JwtService } from '@nestjs/jwt';
import { userJwtPayload } from '../flatworks/types/types';

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
  async findByUser(@Request() request: any) {
    const token = getToken(request);
    const user = (await this.jwtService.decode(token)) as userJwtPayload;
    if (!user || !user.userId) return null;
    return await this.service.findByUser(user.userId);
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post()
  async create(@Body() createWalletDto: CreateWalletDto) {
    return await this.service.create(createWalletDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWalletDto: UpdateWalletDto,
  ) {
    return await this.service.update(id, updateWalletDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
