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
import { CreateJobBidDto } from './dto/create.dto';
import { UpdateJobBidDto } from './dto/update.dto';
import { JobBidService } from './service';
import getToken from '../flatworks/utils/getToken';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { userJwtPayload } from '../flatworks/types';
import { queryTransform, formatRaList } from '../flatworks/utils/getListUtils';

@Controller('jobbids')
export class JobBidController {
  constructor(
    private readonly service: JobBidService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  async getByEmployer(
    @Response() res: any,
    @Query() query,
    @Req() request: Request,
  ) {
    const token = getToken(request);
    const user = (await this.jwtService.decode(token)) as userJwtPayload;
    const mongooseQuery = queryTransform(query);
    mongooseQuery.filter.queryType == 'employer'
      ? (mongooseQuery.filter.employerId = user.userId)
      : mongooseQuery.filter.queryType == 'jobSeeker'
      ? (mongooseQuery.filter.jobSeekerId = user.userId)
      : (mongooseQuery.filter._id = null);

    const result = await this.service.findAll(mongooseQuery);
    return formatRaList(res, result);
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post()
  async create(
    @Body() createJobBidDto: CreateJobBidDto,
    @Req() request: Request,
  ) {
    const token = getToken(request);
    const user = (await this.jwtService.decode(token)) as userJwtPayload;
    return await this.service.create(createJobBidDto, user.userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateJobBidDto: UpdateJobBidDto,
    @Req() request: Request,
  ) {
    const token = getToken(request);
    const user = (await this.jwtService.decode(token)) as userJwtPayload;
    return await this.service.update(id, updateJobBidDto, user.userId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() request: Request) {
    const token = getToken(request);
    const user = (await this.jwtService.decode(token)) as userJwtPayload;
    return await this.service.delete(id, user.userId);
  }
}
