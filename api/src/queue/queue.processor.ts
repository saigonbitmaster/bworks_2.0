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
import { JobBidService } from '../jobbid/service';
import { WalletService } from '../wallet/service';
import { PlutusTxService } from '../plutustx/service';

@Processor('queue')
export class QueueProcessor {
  private readonly logger = new Logger(QueueProcessor.name);
  constructor(
    private readonly jobBidService: JobBidService,
    private readonly walletService: WalletService,
    private readonly plutusTxService: PlutusTxService,
  ) {}

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

  @Process('unlock')
  async unlock(job: Job) {
    const scriptName = 'bworksV2';
    const redeemerJsonFile = 'secret.json';
    const payCollatelWalletName = 'wallet01';
    const jobBid = (await this.jobBidService.findOne(job.data.jobBidId)) as any;
    const jobSeekerWallet = await this.walletService.findByUser(
      jobBid.jobSeekerId,
    );
    const employerWallet = await this.walletService.findByUser(
      jobBid.employerId,
    );
    //if job is complete pay to job seeker else return to employer
    const unlockType = jobBid.isCompleted ? 'paid' : 'return';
    const receiveWalletAddress = jobBid.isCompleted
      ? jobSeekerWallet.address
      : employerWallet.address;
    const scriptTxHash = job.data.scriptTxHash;
    const unlockScript = process.env.UNLOCK_SHELL_SCRIPT;
    exec(
      `zsh ./src/flatworks/shellscripts/${unlockScript} ${scriptName} ${redeemerJsonFile} ${payCollatelWalletName} ${receiveWalletAddress} ${scriptTxHash} `,
      (err, stdout, stderr) => {
        //if shell script exec fail
        if (err) {
          this.plutusTxService.findByScriptTxHashAndUpdate(scriptTxHash, {
            unlockMessage: 'unlock plutus job failed',
            completedAt: new Date(),
          });
          console.error('error:', err, job);
        }
        //if transaction sign failed
        if (stderr) {
          this.plutusTxService.findByScriptTxHashAndUpdate(scriptTxHash, {
            unlockMessage: 'unlock plutus transaction sign failed',
            completedAt: new Date(),
          });
          console.log(`stderr: ${stderr}`);
        } else {
          //remove null line then get transaction hash at last line of stdout
          const matches = stdout.split(/[\n\r]/g);
          const unlockedTxHash = matches
            .filter((item) => item !== '')
            .slice(-1)[0];

          this.plutusTxService.findByScriptTxHashAndUpdate(scriptTxHash, {
            unlockedTxHash: unlockedTxHash,
            unlockType: unlockType,
            isUnlocked: true,
            unlockMessage: 'unlock plutus transaction is submitted',
            unlockDate: new Date(),
            completedAt: new Date(),
          });

          console.log(jobBid);
          this.jobBidService.updateByBackgroundJob(jobBid._id, {
            isPaid: true,
            completedAt: new Date(),
          });

          console.log(`stdout: ${stdout}`);
        }
      },
    );
  }

  @Process('unlockMainnet')
  async unlockMainnet(job: Job) {
    const scriptName = 'bworksV2';
    const redeemerJsonFile = 'secretMainnet.json';
    const payCollatelWalletName = 'wallet01Mainnet';
    const jobBid = (await this.jobBidService.findOne(job.data.jobBidId)) as any;
    const jobSeekerWallet = await this.walletService.findByUser(
      jobBid.jobSeekerId,
    );
    const employerWallet = await this.walletService.findByUser(
      jobBid.employerId,
    );
    //if job is complete pay to job seeker else return to employer
    const unlockType = jobBid.isCompleted ? 'paid' : 'return';
    const receiveWalletAddress = jobBid.isCompleted
      ? jobSeekerWallet.address
      : employerWallet.address;
    const scriptTxHash = job.data.scriptTxHash;
    const unlockScript = process.env.UNLOCK_SHELL_SCRIPT_MAINNET;
    console.log(receiveWalletAddress, unlockScript, scriptTxHash);
    exec(
      `zsh ./src/flatworks/shellscripts/${unlockScript} ${scriptName} ${redeemerJsonFile} ${payCollatelWalletName} ${receiveWalletAddress} ${scriptTxHash} `,
      (err, stdout, stderr) => {
        //if shell script exec fail
        if (err) {
          this.plutusTxService.findByScriptTxHashAndUpdate(scriptTxHash, {
            unlockMessage: 'unlock plutus job failed',
            completedAt: new Date(),
          });
          console.error('error:', err, job);
        }
        //if transaction sign failed
        if (stderr) {
          this.plutusTxService.findByScriptTxHashAndUpdate(scriptTxHash, {
            unlockMessage: 'unlock plutus transaction sign failed',
            completedAt: new Date(),
          });
          console.log(`stderr: ${stderr}`);
        } else {
          //remove null line then get transaction hash at last line of stdout
          const matches = stdout.split(/[\n\r]/g);
          const unlockedTxHash = matches
            .filter((item) => item !== '')
            .slice(-1)[0];

          this.plutusTxService.findByScriptTxHashAndUpdate(scriptTxHash, {
            unlockedTxHash: unlockedTxHash,
            unlockType: unlockType,
            isUnlocked: true,
            unlockMessage: 'unlock plutus transaction is submitted',
            unlockDate: new Date(),
            completedAt: new Date(),
          });

          console.log(jobBid);
          this.jobBidService.updateByBackgroundJob(jobBid._id, {
            isPaid: true,
            completedAt: new Date(),
          });

          console.log(`stdout: ${stdout}`);
        }
      },
    );
  }
}
