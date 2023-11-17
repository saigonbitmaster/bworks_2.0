import {
  Controller,
  Delete,
  Get,
  Param,
  Response,
  Query,
  Put,
  Body,
  Post,
} from '@nestjs/common';
import { SettingService } from './service';
import { queryTransform, formatRaList } from '../flatworks/utils/getlist';
import { Roles } from '../flatworks/roles/roles.decorator';
import { Role } from '../flatworks/types/types';
import { UpdateSettingDto } from './dto/update.dto';
import { CreateSettingDto } from './dto/create.dto';

/*
Only CMS user to create/update/delete.
All users to view
*/

@Controller('settings')
export class SettingController {
  constructor(private readonly service: SettingService) {}

  @Get()
  async getAll(@Response() res: any, @Query() query) {
    console.log(query);
    const mongooseQuery = queryTransform(query);
    const result = await this.service.findAll(mongooseQuery);
    return formatRaList(res, result);
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Roles(Role.Admin)
  @Post()
  async create(@Body() createSettingDto: CreateSettingDto) {
    return await this.service.create(createSettingDto);
  }

  @Roles(Role.Admin)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSettingDto: UpdateSettingDto,
  ) {
    return await this.service.update(id, updateSettingDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
