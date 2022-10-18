import { Controller, Get, Response, Query, Post, Body } from '@nestjs/common';
import { ToolService } from './service';
import { GitLink } from '../flatworks/types/types';
import { queryTransform, formatRaList } from '../flatworks/utils/getlist';

@Controller('tools')
export class ToolController {
  constructor(private readonly service: ToolService) {}

  @Post('getGitLanguages')
  async accountLanguages(@Body() gitLink: GitLink) {
    return await this.service.accountLanguages(gitLink);
  }

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
  async txsUtxo(@Response() res: any, @Query() query) {
    const transformQuery = queryTransform(query);

    if (!transformQuery.filter.queryType || !transformQuery.filter.value) {
      return formatRaList(res, { count: 0, data: [] });
    }

    if (transformQuery.filter.queryType === 'utx') {
      const response = await this.service.txsUtxo(transformQuery.filter.value);
      return formatRaList(res, { count: 1, data: [response] });
    }

    const response = await this.service.addressUtxo(
      transformQuery.filter.value,
    );
    const data = response.slice(
      transformQuery.skip,
      transformQuery.limit + transformQuery.skip,
    );
    return formatRaList(res, { count: response.length, data: data });
  }

  @Get('commits')
  async getCommits(@Response() res: any, @Query() query) {
    const transformQuery = queryTransform(query);

    if (!transformQuery.filter.queryType || !transformQuery.filter.value) {
      return formatRaList(res, { count: 0, data: [] });
    }
    if (transformQuery.filter.queryType === 'commit') {
      const response = await this.service.repoCommits(
        transformQuery.filter.value,
      );
      const data = response.slice(
        transformQuery.skip,
        transformQuery.limit + transformQuery.skip,
      );
      return formatRaList(res, { count: response.length, data: data });
    }
    if (transformQuery.filter.queryType === 'codescan') {
      const response = await this.service.repoCodeScan(
        transformQuery.filter.value,
      );
      const data = response.slice(
        transformQuery.skip,
        transformQuery.skip + transformQuery.limit,
      );
      return formatRaList(res, { count: response.length, data: data });
    }
  }
}
