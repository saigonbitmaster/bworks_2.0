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
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create.dto';
import { UpdateMessageDto } from './dto/update.dto';
import { MessageService } from './service';
import { queryTransform, formatRaList } from '../flatworks/utils/getlist';
import { Public } from '../flatworks/roles/public.api.decorator';
import { Roles } from '../flatworks/roles/roles.decorator';
import { Role } from '../flatworks/types/types';
import { HomePageAuthGuard } from '../auth/home-page-auth.guard';

@Controller('messages')
export class MessageController {
  constructor(private readonly service: MessageService) {}

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

  @UseGuards(HomePageAuthGuard)
  @Post()
  @Public()
  async create(@Body() createMessageDto: CreateMessageDto) {
    return await this.service.create(createMessageDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return await this.service.update(id, updateMessageDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
