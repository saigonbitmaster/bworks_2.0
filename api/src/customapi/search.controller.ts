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
} from '@nestjs/common';
import { SearchService } from './search.service';
import { queryTransform, formatRaList } from '../flatworks/utils/getlist';

@Controller('customapis')
export class SearchController {
  constructor(private readonly service: SearchService) {}

  @Get('searchall')
  async indexTokenReceiver(@Response() res: any, @Query() query) {
    const mongooseQuery = queryTransform(query);
    const result = await this.service.findAll(mongooseQuery);
    return formatRaList(res, result);
  }
}
