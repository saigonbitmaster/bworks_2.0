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

@Controller('Skills')
export class SkillController {
  constructor(private readonly service: SkillService) {}

  @Get()
  async index(@Response() res: any, @Query() query) {
    const sort = {};

    query.sort
      ? (sort[JSON.parse(query.sort)[0]] =
          JSON.parse(query.sort)[1] === 'ASC' ? 1 : -1)
      : null;
    const range = query.range ? JSON.parse(query.range) : [0, 10];
    const [rangeStart, rangeEnd] = [...range];
    const limit = rangeEnd - rangeStart + 1;
    const skip = rangeStart;
    const filter = query.filter ? JSON.parse(query.filter) : {};
    const result = await this.service.findAll(filter, sort, skip, limit);
    return res
      .set({
        'Content-Range': result.count,
        'Access-Control-Expose-Headers': 'Content-Range',
      })
      .json(result.data);
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
  async update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto) {
    return await this.service.update(id, updateSkillDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
