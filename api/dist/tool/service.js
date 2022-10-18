"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const github_1 = require("../flatworks/utils/github");
const cardano_1 = require("../flatworks/utils/cardano");
let ToolService = class ToolService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async accountLanguages(gitLink) {
        return await (0, github_1.AccountLanguages)(gitLink);
    }
    async repoCommits(gitLink) {
        return await (0, github_1.RepoCommits)(gitLink);
    }
    addressUtxo(address) {
        return (0, cardano_1.AddressUtxo)(address, this.httpService);
    }
    txsUtxo(txHash) {
        return (0, cardano_1.TxsUtxo)(txHash, this.httpService);
    }
    checkWallet(address, amount) {
        return (0, cardano_1.CheckWallet)(address, amount, this.httpService);
    }
    async repoCodeScan(gitLink) {
        return await (0, github_1.RepoCodeScan)(gitLink);
    }
};
ToolService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], ToolService);
exports.ToolService = ToolService;
//# sourceMappingURL=service.js.map