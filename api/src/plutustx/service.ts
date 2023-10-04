import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlutusTxDto } from './dto/create.dto';
import { UpdatePlutusTxDto } from './dto/update.dto';
import { PlutusTx, PlutusTxDocument } from './schemas/schema';
import { RaList, MongooseQuery } from '../flatworks/types/types';
import { JobBidService } from '../jobbid/service';

import {
  plutusDashboardScript,
  plutusScript,
  plutusMonthlyScript,
} from '../flatworks/dbcripts/aggregate.scripts';
import * as moment from 'moment';

@Injectable()
export class PlutusTxService {
  constructor(
    @InjectModel(PlutusTx.name) private readonly model: Model<PlutusTxDocument>,
    private jobBidService: JobBidService,
  ) {}

  async getMonthlyPlutusTxsReport(queryType, userId): Promise<any> {
    const toDate = moment().toDate();
    const fromDate = moment().subtract(1, 'year').toDate();

    const months = [];
    for (let i = 0; i < 12; i++) {
      const month = moment().subtract(i, 'month').format('M-YYYY').toString();
      const shortYear = moment()
        .subtract(i, 'month')
        .format('MM-YY')
        .toString();
      const date = moment().subtract(i, 'month').toDate();
      months.push({ _id: month, shortYear, date });
    }

    const aggregateScript = plutusMonthlyScript(
      queryType,
      userId,
      fromDate,
      toDate,
    );
    const _result = await this.model.aggregate(aggregateScript);

    const emptyRecord = {
      _id: '',
      date: '',
      sumLockedAmounts: 0,
      numberOfLockTxs: 0,
      sumUnlockedAmounts: 0,
      numberOfUnlockedTxs: 0,
    };

    const result = months.map((item) => {
      const jobItem = _result.find((jobItem) => jobItem._id == item._id);
      if (jobItem) {
        return { ...jobItem, shortYear: item.shortYear };
      }

      return { ...emptyRecord, ...item };
    });

    return result.reverse();
  }

  async getPlutusReports(queryType: string, userId: string): Promise<any> {
    const aggregateScript = plutusScript(queryType, userId);
    const result = await this.model.aggregate(aggregateScript);
    if (result && result.length) {
      return result[0];
    }

    return {};
  }

  async getPlutusDashboard(): Promise<any> {
    const toDate = moment().toDate();
    const fromDate = moment().subtract(1, 'year').toDate();

    const months = [];
    for (let i = 0; i < 12; i++) {
      const month = moment().subtract(i, 'month').format('M-YYYY').toString();
      const shortYear = moment()
        .subtract(i, 'month')
        .format('MM-YY')
        .toString();
      const date = moment().subtract(i, 'month').toDate();
      months.push({ _id: month, shortYear, date });
    }
    const aggregateScript = plutusDashboardScript(fromDate, toDate);
    const _result = await this.model.aggregate(aggregateScript);

    const emptyRecord = {
      _id: '',
      date: '',
      sumLockedAmounts: 0,
      numberOfLockTxs: 0,
      sumUnlockedAmounts: 0,
      numberOfUnlockedTxs: 0,
    };

    const result = months.map((item) => {
      const jobItem = _result.find((jobItem) => jobItem._id == item._id);
      if (jobItem) {
        return { ...jobItem, shortYear: item.shortYear };
      }

      return { ...emptyRecord, ...item };
    });
    return result.reverse();
  }

  async findAll(query: MongooseQuery): Promise<RaList> {
    const count = await this.model.find(query.filter).count().exec();
    const data = await this.model
      .find(query.filter)
      .sort(query.sort)
      .skip(query.skip)
      .limit(query.limit)
      .exec();

    return { count: count, data: data };
  }

  async findOne(id: string): Promise<PlutusTx> {
    return await this.model.findById(id).exec();
  }

  async create(createPlutusTxDto: CreatePlutusTxDto): Promise<PlutusTx> {
    return await new this.model({
      ...createPlutusTxDto,
      createdAt: new Date(),
    }).save();
  }

  async update(
    id: string,
    updatePlutusTxDto: UpdatePlutusTxDto,
    userId?: string,
  ): Promise<PlutusTx> {
    //update jobBid isPaid if the transaction is signed by right unlockUserId from browser
    const currentRecord = await this.findOne(id);
    if (
      updatePlutusTxDto.unlockedTxHash &&
      userId === currentRecord.unlockUserId
    ) {
      this.jobBidService.updateByBackgroundJob(currentRecord.jobBidId, {
        isPaid: true,
        completedAt: new Date(),
      });
    }
    return await this.model.findByIdAndUpdate(id, updatePlutusTxDto).exec();
  }

  async findByScriptTxHashAndUpdate(
    scriptTxHash: string,
    updatePlutusTxDto: UpdatePlutusTxDto,
  ): Promise<PlutusTx> {
    return await this.model
      .findOneAndUpdate({ lockedTxHash: scriptTxHash }, updatePlutusTxDto)
      .exec();
  }

  async delete(id: string): Promise<PlutusTx> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
