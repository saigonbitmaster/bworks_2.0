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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolController = void 0;
const common_1 = require("@nestjs/common");
const service_1 = require("./service");
const getlist_1 = require("../flatworks/utils/getlist");
let ToolController = class ToolController {
    constructor(service) {
        this.service = service;
    }
    async accountLanguages(gitLink) {
        return await this.service.accountLanguages(gitLink);
    }
    async checkWallet(res, query) {
        const address = query.address ? JSON.parse(query.address) : null;
        const amount = query.amount ? JSON.parse(query.amount) : null;
        if (!address || !amount) {
            return res.json({});
        }
        const response = await this.service.checkWallet(address, amount);
        return res.json(response);
    }
    async txsUtxo(res, query) {
        const transformQuery = (0, getlist_1.queryTransform)(query);
        if (!transformQuery.filter.queryType || !transformQuery.filter.value) {
            return (0, getlist_1.formatRaList)(res, { count: 0, data: [] });
        }
        if (transformQuery.filter.queryType === 'utx') {
            const response = await this.service.txsUtxo(transformQuery.filter.value);
            return (0, getlist_1.formatRaList)(res, { count: 1, data: [response] });
        }
        const response = await this.service.addressUtxo(transformQuery.filter.value);
        const data = response.slice(transformQuery.skip, transformQuery.limit + transformQuery.skip);
        return (0, getlist_1.formatRaList)(res, { count: response.length, data: data });
    }
    async getCommits(res, query) {
        const transformQuery = (0, getlist_1.queryTransform)(query);
        if (!transformQuery.filter.queryType || !transformQuery.filter.value) {
            return (0, getlist_1.formatRaList)(res, { count: 0, data: [] });
        }
        if (transformQuery.filter.queryType === 'commit') {
            const response = await this.service.repoCommits(transformQuery.filter.value);
            const data = response.slice(transformQuery.skip, transformQuery.limit + transformQuery.skip);
            return (0, getlist_1.formatRaList)(res, { count: response.length, data: data });
        }
        if (transformQuery.filter.queryType === 'codescan') {
            const response = await this.service.repoCodeScan(transformQuery.filter.value);
            const data = response.slice(transformQuery.skip, transformQuery.skip + transformQuery.limit);
            return (0, getlist_1.formatRaList)(res, { count: response.length, data: data });
        }
    }
};
__decorate([
    (0, common_1.Post)('getGitLanguages'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ToolController.prototype, "accountLanguages", null);
__decorate([
    (0, common_1.Get)('checkWallet'),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ToolController.prototype, "checkWallet", null);
__decorate([
    (0, common_1.Get)('utxos'),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ToolController.prototype, "txsUtxo", null);
__decorate([
    (0, common_1.Get)('commits'),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ToolController.prototype, "getCommits", null);
ToolController = __decorate([
    (0, common_1.Controller)('tools'),
    __metadata("design:paramtypes", [service_1.ToolService])
], ToolController);
exports.ToolController = ToolController;
//# sourceMappingURL=controller.js.map