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
  UseGuards,
  Req,
} from '@nestjs/common';
import { PublicService } from './public.service';
import { PlutusTxService } from '../plutustx/service';
import * as moment from 'moment';
import { PostJobService } from '../postjob/service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import * as lodash from 'lodash';
import { queryTransform } from '../flatworks/utils/getlist';

@UseGuards(JwtAuthGuard)
@Controller('customapis')
export class CustomController {
  constructor(
    private readonly plutusTxService: PlutusTxService,
    private readonly postJobService: PostJobService,
  ) {}

  //plutus report
  @Get('plutusreports')
  async getDashboardPlutus(
    @Response() res: any,
    @Req() request,
    @Query() query,
  ) {
    const userId = lodash.get(request, 'user.userId', null);
    const mongooseQuery = queryTransform(query);
    const queryType = mongooseQuery.filter.queryType;

    //if queryType = emp return plutus txs that locked by emp, if queryType = jsk return plutus txs bid by jsk, if queryType = cms return all plutus txs
    if (!userId || !queryType) {
      return res.json({});
    }
    const result = await this.plutusTxService.getPlutusReports(
      queryType,
      userId,
    );
    return res.json(result);
  }

  //job report
  @Get('jobreports')
  async getDashboardJob(@Response() res: any, @Req() request, @Query() query) {
    const userId = lodash.get(request, 'user.userId', null);
    const mongooseQuery = queryTransform(query);
    const queryType = mongooseQuery.filter.queryType;

    //if queryType = emp return plutus txs that locked by emp, if queryType = jsk return plutus txs bid by jsk, if queryType = cms return all plutus txs
    if (!userId || !queryType) {
      return res.json({});
    }
    const result = await this.postJobService.getJobReports(queryType, userId);
    return res.json(result);
  }
}
