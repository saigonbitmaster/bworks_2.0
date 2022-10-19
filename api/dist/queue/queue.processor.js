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
var QueueProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const child_process_1 = require("child_process");
const cardano_1 = require("../flatworks/utils/cardano");
const github_1 = require("../flatworks/utils/github");
let QueueProcessor = QueueProcessor_1 = class QueueProcessor {
    constructor() {
        this.logger = new common_1.Logger(QueueProcessor_1.name);
    }
    onActive(job) {
        console.log(`Processing job ${job.id} of type ${job.name} with data ${job.data}...`);
    }
    onComplete(job) {
        console.log(`Completed job ${job.id} of type ${job.name} with data ${job.data}...`);
    }
    createWallet(job) {
        (0, cardano_1.CreateWallet)(job.data.userId);
    }
    analyzeGit(job) {
        (0, github_1.AccountLanguagesForUser)(job.data.gitLink, job.data.userId);
    }
    execShell(job) {
        (0, child_process_1.exec)('ls', (err, stdout, stderr) => {
            if (err) {
                console.error(err, job);
            }
            else {
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
            }
        });
    }
};
__decorate([
    (0, bull_1.OnQueueActive)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], QueueProcessor.prototype, "onActive", null);
__decorate([
    (0, bull_1.OnQueueCompleted)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], QueueProcessor.prototype, "onComplete", null);
__decorate([
    (0, bull_1.Process)('createWallet'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], QueueProcessor.prototype, "createWallet", null);
__decorate([
    (0, bull_1.Process)('analyzeGit'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], QueueProcessor.prototype, "analyzeGit", null);
__decorate([
    (0, bull_1.Process)('execShell'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], QueueProcessor.prototype, "execShell", null);
QueueProcessor = QueueProcessor_1 = __decorate([
    (0, bull_1.Processor)('queue')
], QueueProcessor);
exports.QueueProcessor = QueueProcessor;
//# sourceMappingURL=queue.processor.js.map