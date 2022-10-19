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

  @Get()
  async getJobs(@Response() res: any, @Query() query) {
    const jobQuery = queryTransform(query);
    const jobStatus =
      jobQuery.filter && jobQuery.filter.jobStatus
        ? jobQuery.filter.jobStatus
        : ['waiting', 'active', 'completed', 'failed', 'delayed'];
    const jobs = await this.QueueQueue.getJobs(jobStatus);
    console.log('all jobs status job ', jobs);
    return formatRaList(res, { count: 0, data: jobs });
  }
}
