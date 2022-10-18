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
import { CreateCurrencyDto } from './dto/create.dto';
import { UpdateCurrencyDto } from './dto/update.dto';
import { CurrencyService } from './service';
import { queryTransform, formatRaList } from '../flatworks/utils/getlist';

@Controller('currencies')
export class CurrencyController {
  constructor(private readonly service: CurrencyService) {}

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
  async create(@Body() createCurrencyDto: CreateCurrencyDto) {
    return await this.service.create(createCurrencyDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCurrencyDto: UpdateCurrencyDto,
  ) {
    return await this.service.update(id, updateCurrencyDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
