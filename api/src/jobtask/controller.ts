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
import { CreateJobTaskDto } from './dto/create.dto';
import { UpdateJobTaskDto } from './dto/update.dto';
import { JobTaskService } from './service';
import { queryTransform, formatRaList } from '../flatworks/utils/getlist';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import * as lodash from 'lodash';
import { JobBidService } from '../jobbid/service';

//need to replace bidJob service by contractedJob
@UseGuards(JwtAuthGuard)
@Controller('jobtasks')
export class JobTaskController {
  constructor(
    private readonly service: JobTaskService,
    private readonly jobBidService: JobBidService,
  ) {}

  @Get()
  async getByEmployer(@Response() res: any, @Query() query, @Req() request) {
    const userId = lodash.get(request, 'user.userId', null);
    const mongooseQuery = queryTransform(query);
    mongooseQuery.filter.queryType == 'employer'
      ? (mongooseQuery.filter.jobId = {
          $in: (
            await this.jobBidService.findAllRaw({ employerId: userId })
          ).map((item) => item.jobId.toString()),
        })
      : mongooseQuery.filter.queryType == 'jobSeeker'
      ? (mongooseQuery.filter.jobId = {
          $in: (
            await this.jobBidService.findAllRaw({ jobSeekerId: userId })
          ).map((item) => item.jobId.toString()),
        })
      : (mongooseQuery.filter.jobId = []);

    const result = await this.service.findAll(mongooseQuery);
    return formatRaList(res, result);
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post()
  async create(@Body() createJobTaskDto: CreateJobTaskDto, @Req() request) {
    //either jobSeekerId or employerId own the bid, allow create task for the job. otherwise don't allow
    const userId = lodash.get(request, 'user.userId', null);
    const jobIds = (
      await this.jobBidService.findAllRaw({
        $or: [{ jobSeekerId: userId }, { employeeId: userId }],
      })
    ).map((item) => item.jobId.toString());
    if (!jobIds.includes(createJobTaskDto.jobId)) {
      return null;
    }

    return await this.service.create(createJobTaskDto, userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateJobTaskDto: UpdateJobTaskDto,
    @Req() request,
  ) {
    //either jobSeekerId or employerId own the bid, allow create task for the job. otherwise don't allow
    const userId = lodash.get(request, 'user.userId', null);
    const jobIds = (
      await this.jobBidService.findAllRaw({
        $or: [{ jobSeekerId: userId }, { employeeId: userId }],
      })
    ).map((item) => item.jobId.toString());

    if (!jobIds.includes(updateJobTaskDto.jobId)) {
      return null;
    }

    return await this.service.update(
      id,
      updateJobTaskDto,
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
