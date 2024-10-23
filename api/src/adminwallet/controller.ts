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
import { CreateAdminWalletDto } from './dto/create.dto';
import { UpdateAdminWalletDto } from './dto/update.dto';
import { AdminWalletService } from './service';
import { queryTransform, formatRaList } from '../flatworks/utils/getlist';

@Controller('adminwallets')
export class AdminWalletController {
  constructor(private readonly service: AdminWalletService) {}

  @Get()
  async index(@Response() res: any, @Query() query) {
    const mongooseQuery = queryTransform(query);
    const result = await this.service.findAll(mongooseQuery);
    return formatRaList(res, result);
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }
  /* 
  @Post()
  async create(@Body() createAdminWalletDto: CreateAdminWalletDto) {
    return await this.service.create(createAdminWalletDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAdminWalletDto: UpdateAdminWalletDto,
  ) {
    return await this.service.update(id, updateAdminWalletDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  } */
}
