"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepoCodeScan = exports.RepoCommits = exports.AccountLanguages = void 0;
const core_1 = require("@octokit/core");
const AccountLanguages = async (gitLink) => {
    var e_1, _a;
    const gitToken = process.env.GITHUB_TOKEN;
    const result = {};
    const languages = [];
    const gitUrl = gitLink.gitUrl;
    const [owner] = gitUrl.split('github.com/').length > 1
        ? gitUrl.split('github.com/')[1].split('/')
        : null;
    const octokit = new core_1.Octokit({
        auth: gitToken,
    });
    const repos = await octokit.request(`GET /users/${owner}/repos`, {
        org: owner,
    });
    try {
        for (var _b = __asyncValues(repos.data), _c; _c = await _b.next(), !_c.done;) {
            const item = _c.value;
            const repoLanguages = await octokit.request(`GET /repos/${owner}/${item.name}/languages`, {
                owner: owner,
                repo: item.name,
            });
            result[item.name] = repoLanguages.data;
            languages.push(...Object.keys(repoLanguages.data));
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return { details: result, languages: [...new Set(languages)] };
};
exports.AccountLanguages = AccountLanguages;
const RepoCommits = async (gitLink) => {
    const gitToken = process.env.GITHUB_TOKEN;
    const octokit = new core_1.Octokit({
        auth: gitToken,
    });
    const [owner, repo] = gitLink.split('github.com/').length > 1
        ? gitLink.split('github.com/')[1].split('/')
        : null;
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
};
exports.RepoCommits = RepoCommits;
const RepoCodeScan = async (gitLink) => {
    const gitToken = process.env.GITHUB_TOKEN;
    const octokit = new core_1.Octokit({
        auth: gitToken,
    });
    const [owner, repo] = gitLink.split('github.com/').length > 1
        ? gitLink.split('github.com/')[1].split('/')
        : null;
    let result = [];
    try {
        const response = await octokit.request('GET /repos/{owner}/{repo}/code-scanning/alerts', {
            owner: owner,
            repo: repo,
        });
        result = response.data.map((item) => ({
            name: item.rule.id,
            severity: item.rule.severity,
            description: item.rule.description,
            url: item.html_url,
        }));
    }
    catch (error) {
        result.push({
            name: 'You are not authorized to read code scanning alerts.',
            description: 'the given repo need extra setup for code scanning alerts',
            url: gitLink,
        });
        console.error(error);
    }
    return result;
};
exports.RepoCodeScan = RepoCodeScan;
//# sourceMappingURL=github.js.map