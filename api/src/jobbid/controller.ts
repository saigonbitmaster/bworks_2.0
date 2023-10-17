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
import { Roles } from '../flatworks/roles/roles.decorator';
import { Role } from '../flatworks/types/types';
import { MessageDto } from './dto/message.dto';

@UseGuards(JwtAuthGuard)
@Controller(['jobbids', 'jobbidsjsk'])
export class JobBidController {
  constructor(private readonly service: JobBidService) {}
  /*
return related applications to employer and job seeker.
if requested user is not either employer or job seeker remove description (apply letter) before return
*/
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
      : (mongooseQuery.select = { description: 0 });

    const result = await this.service.findAll(mongooseQuery);
    return formatRaList(res, result);
  }

  //return only if user is job seeker, employer
  @Get(':id')
  async find(@Param('id') id: string, @Req() request) {
    const userId = lodash.get(request, 'user.userId', null);
    return await this.service.findOneForRest(id, userId);
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

  @Post('/messages/:id')
  async createMessage(
    @Param('id') id: string,
    @Body() messageDto: MessageDto,
    @Req() request,
  ) {
    return await this.service.createMessage(
      id,
      messageDto,
      lodash.get(request, 'user.userId', null),
    );
  }

  @Post('/messages/:id/:messageId')
  async deleteMessage(
    @Param('id') id: string,
    @Param('messageId') messageId: string,
    @Req() request,
  ) {
    console.log(messageId);
    return await this.service.deleteMessage(
      id,
      messageId,
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
