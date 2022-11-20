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
import { CreateContractDto } from './dto/create.dto';
import { UpdateContractDto } from './dto/update.dto';
import { ContractService } from './service';
import { queryTransform, formatRaList } from '../flatworks/utils/getlist';

@Controller('contracts')
export class ContractController {
  constructor(private readonly service: ContractService) {}

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
  async create(@Body() createContractDto: CreateContractDto) {
    return await this.service.create(createContractDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateContractDto: UpdateContractDto,
  ) {
    return await this.service.update(id, updateContractDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
