import { InjectQueue } from '@nestjs/bull';
import { Controller, Post, Body, Get, Response, Query } from '@nestjs/common';
import { Queue } from 'bull';
import { queryTransform, formatRaList } from '../flatworks/utils/getlist';

import { Roles } from '../flatworks/roles/roles.decorator';
import { Role } from '../flatworks/types/types';

@Controller('queues')
export class QueueController {
  constructor(@InjectQueue('queue') private readonly QueueQueue: Queue) {}

  @Post('analyzegit')
  async analyzeGit(@Body() postBody: any) {
    await this.QueueQueue.add('analyzeGit', {
      gitLink: postBody.gitLink,
    });
  }

  @Post('createwallet')
  async createWallet(@Body() postBody: any) {
    await this.QueueQueue.add('createWallet', {
      userId: postBody.userId,
    });
  }

  @Post('execshell')
  async execShell(@Body() postBody: any) {
    await this.QueueQueue.add('execShell', {
      userId: postBody.userId,
    });
  }

  @Post('unlock')
  @Roles(Role.Admin)
  async unlock(@Body() postBody: any) {
    await this.QueueQueue.add('unlock', {
      jobBidId: postBody.jobBidId,
      scriptTxHash: postBody.scriptTxHash,
    });
  }

  @Post('unlockMainnet')
  @Roles(Role.Admin)
  async unlockMainnet(@Body() postBody: any) {
    console.log(postBody);
    await this.QueueQueue.add('unlockMainnet', {
      jobBidId: postBody.jobBidId,
      scriptTxHash: postBody.scriptTxHash,
    });
  }

  @Post('scamfilter')
  async scamFilter(@Body() postBody: any) {
    await this.QueueQueue.add('scamFilter', {
      userId: postBody.userId,
    });
  }

  @Get()
  @Roles(Role.Admin)
  async getJobs(@Response() res: any, @Query() query) {
    const transformQuery = queryTransform(query);
    const jobStatus =
      transformQuery.filter && transformQuery.filter.jobStatus
        ? transformQuery.filter.jobStatus
        : ['waiting', 'active', 'completed', 'failed', 'delayed'];
    const jobs = await this.QueueQueue.getJobs(jobStatus);

    const _data = jobs.slice(
      transformQuery.skip,
      transformQuery.limit + transformQuery.skip,
    );
    //trick to remove converting circular structure to JSON error.
    const data = _data.map((item) => {
      const _item: any = JSON.parse(JSON.stringify(item));
      _item._id = item.id;
      return _item;
    });
    return formatRaList(res, {
      count: jobs.length,
      data: data,
    });
  }
}
