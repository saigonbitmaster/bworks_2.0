import {
  Controller,
  Delete,
  Get,
  Param,
  Response,
  Query,
  Put,
  Body,
} from '@nestjs/common';
import { JobBidService } from './service';
import { queryTransform, formatRaList } from '../flatworks/utils/getlist';
import { Roles } from '../flatworks/roles/roles.decorator';
import { Role } from '../flatworks/types/types';
import { UpdateJobBidDto } from './dto/update.dto';

@Roles(Role.Admin)
@Controller('jobbidscms')
export class JobBidControllerCms {
  constructor(private readonly service: JobBidService) {}

  @Get()
  async getAll(@Response() res: any, @Query() query) {
    const mongooseQuery = queryTransform(query);
    const result = await this.service.findAllCms(mongooseQuery);
    return formatRaList(res, result);
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOneCms(id);
  }

  @Put('/approve/:id')
  async approve(
    @Param('id') id: string,
    @Body() updateJobBidDto: UpdateJobBidDto,
  ) {
    return await this.service.approve(id, updateJobBidDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.deleteCms(id);
  }
}
