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
import { CreateSkillDto } from './dto/create.dto';
import { UpdateSkillDto } from './dto/update.dto';
import { SkillService } from './service';
import { queryTransform, formatRaList } from '../flatworks/utils/getlist';

@Controller('Skills')
export class SkillController {
  constructor(private readonly service: SkillService) {}

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

  @Post()
  async create(@Body() createSkillDto: CreateSkillDto) {
    return await this.service.create(createSkillDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSkillDto: UpdateSkillDto,
  ) {
    return await this.service.update(id, updateSkillDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
