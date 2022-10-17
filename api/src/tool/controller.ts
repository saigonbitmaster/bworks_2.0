import { Controller, Get, Response, Query, Post, Body } from '@nestjs/common';
import { ToolService } from './service';
import { GitLink } from '../flatworks/types';
@Controller('tools')
export class ToolController {
  constructor(private readonly service: ToolService) {}

  //get all languages of a git account
  @Post('getGitLanguages')
  async getGitLanguages(@Body() gitLink: GitLink) {
    return await this.service.getGitHubLanguages(gitLink);
  }

  //check if an address has enough ADA
  @Get('checkWallet')
  async checkWallet(@Response() res: any, @Query() query) {
    const address = query.address ? JSON.parse(query.address) : null;
    const amount = query.amount ? JSON.parse(query.amount) : null;

    if (!address || !amount) {
      return res.json({});
    }

    const response = await this.service.checkWallet(address, amount);
    return res.json(response);
  }

  @Get('utxos')
  async getUtxos(@Response() res: any, @Query() query) {
    const range = query.range ? JSON.parse(query.range) : [0, 10];
    const [rangeStart, rangeEnd] = [...range];
    const filter = query.filter ? JSON.parse(query.filter) : null;
    if (!filter.queryType || !filter.value) {
      return res
        .set({
          'Content-Range': 0,
          'Access-Control-Expose-Headers': 'Content-Range',
        })
        .json([]);
    }
    //get utxos of a tx_hash, query utx return only 1 record.
    if (filter.queryType === 'utx') {
      const response = await this.service.getTxsUtxo(filter.value);

      return res
        .set({
          'Content-Range': 1,
          'Access-Control-Expose-Headers': 'Content-Range',
        })
        .json([response]);
    }
    //get utxos of a address, query utx return array.
    const response = await this.service.getAddressUtxo(filter.value);
    const data = response.slice(rangeStart, rangeEnd + 1);

    return res
      .set({
        'Content-Range': response.length,
        'Access-Control-Expose-Headers': 'Content-Range',
      })
      .json(data);
  }

  @Get('commits')
  async getCommits(@Response() res: any, @Query() query) {
    const range = query.range ? JSON.parse(query.range) : [0, 10];
    const [rangeStart, rangeEnd] = [...range];
    const filter = query.filter ? JSON.parse(query.filter) : null;

    if (!filter.queryType || !filter.value) {
      return res
        .set({
          'Content-Range': 0,
          'Access-Control-Expose-Headers': 'Content-Range',
        })
        .json([]);
    }
    if (filter.queryType === 'commit') {
      const response = await this.service.getRepoCommits(filter.value);
      const data = response.slice(rangeStart, rangeEnd + 1);

      return res
        .set({
          'Content-Range': response.length,
          'Access-Control-Expose-Headers': 'Content-Range',
        })
        .json(data);
    }
    if (filter.queryType === 'codescan') {
      const response = await this.service.repoCodeScan(filter.value);
      const data = response.slice(rangeStart, rangeEnd + 1);

      return res
        .set({
          'Content-Range': response.length,
          'Access-Control-Expose-Headers': 'Content-Range',
        })
        .json(data);
    }
  }
}
