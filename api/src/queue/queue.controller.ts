import { InjectQueue } from '@nestjs/bull';
import { Controller, Post, Body, Get, Response, Query } from '@nestjs/common';
import { Queue } from 'bull';
import { queryTransform, formatRaList } from '../flatworks/utils/getlist';

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

  @Post('execShell')
  async execShell(@Body() postBody: any) {
    await this.QueueQueue.add('execShell', {
      userId: postBody.userId,
    });
  }

  @Post('scamFilter')
  async scamFilter(@Body() postBody: any) {
    await this.QueueQueue.add('scamFilter', {
      userId: postBody.userId,
    });
  }

  @Get()
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
