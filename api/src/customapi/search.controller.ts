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
  Request,
} from '@nestjs/common';
import { SearchService } from './search.service';
import { queryTransform } from '../flatworks/utils/getlist';

@Controller('customapis')
export class SearchController {
  constructor(private readonly service: SearchService) {}

  @Get('searchemp')
  async indexEmp(@Response() res: any, @Query() query) {
    const mongooseQuery = queryTransform(query);
    const result: any = await this.service.findAllEmp(mongooseQuery.filter);
    return res.json(result);
  }

  async indexJsk(@Response() res: any, @Query() query) {
    const mongooseQuery = queryTransform(query);
    const result: any = await this.service.findAllJsk(mongooseQuery.filter);
    return res.json(result);
  }

  async indexCms(@Response() res: any, @Query() query) {
    const mongooseQuery = queryTransform(query);
    const result: any = await this.service.findAllCms(mongooseQuery.filter);
    return res.json(result);
  }
}
