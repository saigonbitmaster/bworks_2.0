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
exports.QueueController = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const getlist_1 = require("../flatworks/utils/getlist");
let QueueController = class QueueController {
    constructor(QueueQueue) {
        this.QueueQueue = QueueQueue;
    }
    async analyzeGit(postBody) {
        await this.QueueQueue.add('analyzeGit', {
            gitLink: postBody.gitLink,
        });
    }
    async createWallet(postBody) {
        await this.QueueQueue.add('createWallet', {
            userId: postBody.userId,
        });
    }
    async getJobs(res, query) {
        const jobQuery = (0, getlist_1.queryTransform)(query);
        const jobStatus = jobQuery.filter && jobQuery.filter.jobStatus
            ? jobQuery.filter.jobStatus
            : ['waiting', 'active', 'completed', 'failed', 'delayed'];
        const jobs = await this.QueueQueue.getJobs(jobStatus);
        console.log('all jobs status job ', jobs);
        return (0, getlist_1.formatRaList)(res, { count: 0, data: jobs });
    }
};
__decorate([
    (0, common_1.Post)('analyzegit'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QueueController.prototype, "analyzeGit", null);
__decorate([
    (0, common_1.Post)('createwallet'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QueueController.prototype, "createWallet", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], QueueController.prototype, "getJobs", null);
QueueController = __decorate([
    (0, common_1.Controller)('queues'),
    __param(0, (0, bull_1.InjectQueue)('queue')),
    __metadata("design:paramtypes", [Object])
], QueueController);
exports.QueueController = QueueController;
//# sourceMappingURL=queue.controller.js.map