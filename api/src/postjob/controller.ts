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
import { Roles } from '../flatworks/roles/roles.decorator';
import { Role } from '../flatworks/types/types';

@UseGuards(JwtAuthGuard)
@Controller(['postjobs', 'postjobsjsk'])
export class PostJobController {
  constructor(private readonly service: PostJobService) {}

  @Get()
  async index(@Response() res: any, @Query() query, @Req() request) {
    const mongooseQuery = queryTransform(query);
    const userId = lodash.get(request, 'user.userId', null);
    mongooseQuery.filter.queryType == 'employer'
      ? (mongooseQuery.filter.employerId = userId)
      : null;
    const result = await this.service.findAll(mongooseQuery, userId);
    return formatRaList(res, result);
  }
  //order other get routes before get(:/id)
  //cms only
  @Roles(Role.Admin)
  @Get('/cms')
  async indexCms(@Response() res: any, @Query() query) {
    const mongooseQuery = queryTransform(query);
    const result = await this.service.findAllCms(mongooseQuery);
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

  //cms only
  @Roles(Role.Admin)
  @Put('/approve/:id')
  async approve(
    @Param('id') id: string,
    @Body() updatePostJobDto: UpdatePostJobDto,
  ) {
    return await this.service.approve(id, updatePostJobDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() request) {
    return await this.service.delete(
      id,
      lodash.get(request, 'user.userId', null),
    );
  }
}
