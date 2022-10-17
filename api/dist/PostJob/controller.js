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
exports.PostJobController = void 0;
const common_1 = require("@nestjs/common");
const create_dto_1 = require("./dto/create.dto");
const update_dto_1 = require("./dto/update.dto");
const service_1 = require("./service");
const getToken_1 = require("../flatworks/utils/getToken");
const jwt_1 = require("@nestjs/jwt");
const getListUtils_1 = require("../flatworks/utils/getListUtils");
let PostJobController = class PostJobController {
    constructor(service, jwtService) {
        this.service = service;
        this.jwtService = jwtService;
    }
    async index(res, query, request) {
        const token = (0, getToken_1.default)(request);
        const user = (await this.jwtService.decode(token));
        const mongooseQuery = (0, getListUtils_1.queryTransform)(query);
        mongooseQuery.filter.queryType == 'employer'
            ? (mongooseQuery.filter.employerId = user.userId)
            : null;
        const result = await this.service.findAll(mongooseQuery);
        return (0, getListUtils_1.formatRaList)(res, result);
    }
    async find(id) {
        return await this.service.findOne(id);
    }
    async create(createPostJobDto, request) {
        const token = (0, getToken_1.default)(request);
        const user = (await this.jwtService.decode(token));
        return await this.service.create(createPostJobDto, user.userId);
    }
    async update(id, updatePostJobDto, request) {
        const token = (0, getToken_1.default)(request);
        const user = (await this.jwtService.decode(token));
        return await this.service.update(id, updatePostJobDto, user.userId);
    }
    async delete(id, request) {
        const token = (0, getToken_1.default)(request);
        const user = (await this.jwtService.decode(token));
        return await this.service.delete(id, user.userId);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PostJobController.prototype, "index", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostJobController.prototype, "find", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dto_1.CreatePostJobDto, Object]),
    __metadata("design:returntype", Promise)
], PostJobController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_dto_1.UpdatePostJobDto, Object]),
    __metadata("design:returntype", Promise)
], PostJobController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostJobController.prototype, "delete", null);
PostJobController = __decorate([
    (0, common_1.Controller)('postjobs'),
    __metadata("design:paramtypes", [service_1.PostJobService,
        jwt_1.JwtService])
], PostJobController);
exports.PostJobController = PostJobController;
//# sourceMappingURL=controller.js.map