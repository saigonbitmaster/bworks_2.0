import { Get, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { addressUtxo } from '../flatworks/types';
import { Octokit } from '@octokit/core';
import { checkWalletType, GitLink } from '../flatworks/types';

@Injectable()
export class ToolService {
  constructor(private readonly httpService: HttpService) {}

  @Get()
  async getGitHubLanguages(gitLink: GitLink) {
    //git link: https://github.com/saigonbitmaster/bWorksPublic
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const result = {};
    const languages = [];
    const gitUrl = gitLink.gitUrl;
    const [owner] =
      gitUrl.split('github.com/').length > 1
        ? gitUrl.split('github.com/')[1].split('/')
        : null;

    const octokit = new Octokit({
      auth: GITHUB_TOKEN,
    });
    const repos = await octokit.request(`GET /users/${owner}/repos`, {
      org: owner,
    });

    for await (const item of repos.data) {
      const repoLanguages = await octokit.request(
        `GET /repos/${owner}/${item.name}/languages`,
        {
          owner: owner,
          repo: item.name,
        },
      );

      result[item.name] = repoLanguages.data;
      languages.push(...Object.keys(repoLanguages.data));
    }

    return { details: result, languages: [...new Set(languages)] };
  }

  getAddressUtxo(address: string): Promise<addressUtxo[]> {
    const project_id = process.env.BLOCKFROST_PROJECT_ID;
    const blockfrost_url = process.env.BLOCKFROST_URL;

    return this.httpService
      .get(`${blockfrost_url}/addresses/${address}/utxos`, {
        headers: {
          project_id: project_id,
        },
      })
      .pipe(map((resp) => resp.data))
      .toPromise();
  }

  getTxsUtxo(tx_hash: string): Promise<any[]> {
    const project_id = process.env.BLOCKFROST_PROJECT_ID;
    const blockfrost_url = process.env.BLOCKFROST_URL;

    return this.httpService
      .get(`${blockfrost_url}/txs/${tx_hash}/utxos`, {
        headers: {
          project_id: project_id,
        },
      })
      .pipe(map((resp) => resp.data))
      .toPromise();
  }

  checkWallet(address: string, amount: number): Promise<checkWalletType> {
    const project_id = process.env.BLOCKFROST_PROJECT_ID;
    const blockfrost_url = process.env.BLOCKFROST_URL;
    const result = { amount: 0, isEnough: false };

    return this.httpService
      .get(`${blockfrost_url}/addresses/${address}`, {
        headers: {
          project_id: project_id,
        },
      })
      .pipe(map((resp) => resp.data))
      .toPromise()
      .then((data) => {
        result.amount =
          data.amount.map((item) => (item.unit == 'lovelace' ? item : null))[0]
            .quantity / 1000000;
        result.isEnough = result.amount >= amount;
        return result;
      })
      .catch((err) => err);
  }

  async getRepoCommits(gitLink: string): Promise<any> {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

    const octokit = new Octokit({
      auth: GITHUB_TOKEN,
    });

    const [owner, repo] =
      gitLink.split('github.com/').length > 1
        ? gitLink.split('github.com/')[1].split('/')
        : null;

    //https://github.com/saigonbitmaster/bWorksPublic
    const commits = await octokit.request('GET /repos/{owner}/{repo}/commits', {
      owner: owner,
      repo: repo,
    });

    return commits.data.map((item) => ({
      sha: item.sha,
      message: item.commit.message,
      author: item.commit.author.name,
      date: item.commit.committer.date,
      url: item.html_url,
    }));
  }

  async repoCodeScan(gitLink: string): Promise<any> {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

    const octokit = new Octokit({
      auth: GITHUB_TOKEN,
    });

    const [owner, repo] =
      gitLink.split('github.com/').length > 1
        ? gitLink.split('github.com/')[1].split('/')
        : null;

    //https://github.com/saigonbitmaster/bWorksPublic
    let result = [];
    try {
      const response = await octokit.request(
        'GET /repos/{owner}/{repo}/code-scanning/alerts',
        {
          owner: owner,
          repo: repo,
        },
      );
      result = response.data.map((item) => ({
        name: item.rule.id,
        severity: item.rule.severity,
        description: item.rule.description,
        url: item.html_url,
      }));
    } catch (error) {
      result.push({
        name: 'You are not authorized to read code scanning alerts.',
        description: 'the given repo need extra setup for code scanning alerts',
        url: gitLink,
      });
      console.error(error);
    }

    return result;
  }
}
