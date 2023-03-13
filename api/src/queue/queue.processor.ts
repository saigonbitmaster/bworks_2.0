import {
  Process,
  Processor,
  OnQueueActive,
  OnQueueCompleted,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { exec } from 'child_process';
import { CreateWallet } from '../flatworks/utils/cardano';
import { AccountLanguagesForUser } from '../flatworks/utils/github';
import { ScamFilter } from '../flatworks/utils/filter.scammer';

@Processor('queue')
export class QueueProcessor {
  private readonly logger = new Logger(QueueProcessor.name);

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${JSON.stringify(
        job.data,
      )}...`,
    );
  }

  @OnQueueCompleted()
  onComplete(job: Job) {
    console.log(
      `Completed job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @Process('createWallet')
  createWallet(job: Job) {
    CreateWallet(job.data.userId);
  }

  @Process('scamFilter')
  scamFilter(job: Job) {
    ScamFilter(job.data.userId);
  }

  @Process('analyzeGit')
  analyzeGit(job: Job) {
    AccountLanguagesForUser(job.data.key, job.data.userId);
  }

  @Process('execShell')
  execShell(job: Job) {
    const arg = '-1';
    exec(`ls ${arg}`, (err, stdout, stderr) => {
      if (err) {
        console.error(err, job);
      } else {
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      }
    });
  }
}
