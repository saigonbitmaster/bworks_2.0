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
  UseGuards,
} from '@nestjs/common';
import { CreatePostJobDto } from './dto/create.dto';
import { UpdatePostJobDto } from './dto/update.dto';
import { PostJobService } from './service';
import { queryTransform, formatRaList } from '../flatworks/utils/getlist';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import * as lodash from 'lodash';

@UseGuards(JwtAuthGuard)
@Controller('postjobs')
export class PostJobController {
  constructor(private readonly service: PostJobService) {}

  @Get()
  async index(@Response() res: any, @Query() query, @Req() request) {
    const mongooseQuery = queryTransform(query);
    mongooseQuery.filter.queryType == 'employer'
      ? (mongooseQuery.filter.employerId = lodash.get(
          request,
          'user.userId',
          null,
        ))
      : null;
    const result = await this.service.findAll(mongooseQuery);
    return formatRaList(res, result);
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post()
  async create(@Body() createPostJobDto: CreatePostJobDto, @Req() request) {
    return await this.service.create(
      createPostJobDto,
      lodash.get(request, 'user.userId', null),
    );
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostJobDto: UpdatePostJobDto,
    @Req() request,
  ) {
    return await this.service.update(
      id,
      updatePostJobDto,
      lodash.get(request, 'user.userId', null),
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() request) {
    return await this.service.delete(
      id,
      lodash.get(request, 'user.userId', null),
    );
  }
}
