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
} from '@nestjs/common';
import { CreatePostJobDto } from './dto/create.dto';
import { UpdatePostJobDto } from './dto/update.dto';
import { PostJobService } from './service';
import getToken from '../flatworks/utils/token';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { userJwtPayload } from '../flatworks/types/types';
import { queryTransform, formatRaList } from '../flatworks/utils/getlist';

@Controller('postjobs')
export class PostJobController {
  constructor(
    private readonly service: PostJobService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  async index(@Response() res: any, @Query() query, @Req() request: Request) {
    const token = getToken(request);
    const user = (await this.jwtService.decode(token)) as userJwtPayload;

    const mongooseQuery = queryTransform(query);
    mongooseQuery.filter.queryType == 'employer'
      ? (mongooseQuery.filter.employerId = user.userId)
      : null;
    const result = await this.service.findAll(mongooseQuery);
    return formatRaList(res, result);
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post()
  async create(
    @Body() createPostJobDto: CreatePostJobDto,
    @Req() request: Request,
  ) {
    const token = getToken(request);
    const user = (await this.jwtService.decode(token)) as userJwtPayload;
    return await this.service.create(createPostJobDto, user.userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostJobDto: UpdatePostJobDto,
    @Req() request: Request,
  ) {
    const token = getToken(request);
    const user = (await this.jwtService.decode(token)) as userJwtPayload;
    return await this.service.update(id, updatePostJobDto, user.userId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() request: Request) {
    const token = getToken(request);
    const user = (await this.jwtService.decode(token)) as userJwtPayload;
    return await this.service.delete(id, user.userId);
  }
}
