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
  Req,
} from '@nestjs/common';
import { SearchService } from './search.service';
import { queryTransform } from '../flatworks/utils/getlist';
import * as lodash from 'lodash';

@Controller('customapis')
export class SearchController {
  constructor(private readonly service: SearchService) {}

  @Get('searchemp')
  async indexEmp(@Response() res: any, @Query() query) {
    const mongooseQuery = queryTransform(query);
    const result: any = await this.service.findAllEmp(mongooseQuery.filter);
    return res.json(result);
  }
  @Get('searchjsk')
  async indexJsk(@Response() res: any, @Query() query) {
    const mongooseQuery = queryTransform(query);
    const result: any = await this.service.findAllJsk(mongooseQuery.filter);
    return res.json(result);
  }
  @Get('searchcms')
  async indexCms(@Response() res: any, @Query() query) {
    const mongooseQuery = queryTransform(query);
    const result: any = await this.service.findAllCms(mongooseQuery.filter);
    return res.json(result);
  }
  @Get('searchapp')
  async indexApp(@Response() res: any, @Query() query, @Req() request) {
    const mongooseQuery = queryTransform(query);
    const userId = lodash.get(request, 'user.userId', null);
    const result: any = await this.service.findAllApp(
      mongooseQuery.filter,
      userId,
    );
    return res.json(result);
  }
}
