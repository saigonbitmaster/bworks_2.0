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
import { CreatePlutusTxDto } from './dto/create.dto';
import { UpdatePlutusTxDto } from './dto/update.dto';
import { PlutusTxService } from './service';
import { queryTransform, formatRaList } from '../flatworks/utils/getlist';

@Controller('plutustuxs')
export class PlutusTxController {
  constructor(private readonly service: PlutusTxService) {}

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
  async create(@Body() createPlutusTxDto: CreatePlutusTxDto) {
    return await this.service.create(createPlutusTxDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePlutusTxDto: UpdatePlutusTxDto,
  ) {
    return await this.service.update(id, updatePlutusTxDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
