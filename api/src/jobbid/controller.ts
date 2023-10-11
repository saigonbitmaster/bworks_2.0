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
import { CreateJobBidDto } from './dto/create.dto';
import { UpdateJobBidDto } from './dto/update.dto';
import { JobBidService } from './service';
import { queryTransform, formatRaList } from '../flatworks/utils/getlist';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import * as lodash from 'lodash';

@UseGuards(JwtAuthGuard)
@Controller(['jobbids', 'jobbidsjsk'])
export class JobBidController {
  constructor(private readonly service: JobBidService) {}

  @Get()
  async getByEmployer(@Response() res: any, @Query() query, @Req() request) {
    const mongooseQuery = queryTransform(query);
    const userId = lodash.get(request, 'user.userId', null);
    mongooseQuery.filter.queryType == 'employer'
      ? (mongooseQuery.filter.employerId = userId)
      : mongooseQuery.filter.queryType == 'jobSeeker'
      ? (mongooseQuery.filter.jobSeekerId = userId)
      : mongooseQuery.filter.queryType == 'user'
      ? (mongooseQuery.filter.$or = [
          { jobSeekerId: userId },
          { employerId: userId },
        ])
      : null;

    const result = await this.service.findAll(mongooseQuery);
    return formatRaList(res, result);
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post()
  async create(@Body() createJobBidDto: CreateJobBidDto, @Req() request) {
    return await this.service.create(
      createJobBidDto,
      lodash.get(request, 'user.userId', null),
    );
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateJobBidDto: UpdateJobBidDto,
    @Req() request,
  ) {
    return await this.service.update(
      id,
      updateJobBidDto,
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
