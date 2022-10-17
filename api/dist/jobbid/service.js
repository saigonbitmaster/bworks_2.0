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
exports.JobBidService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schema_1 = require("./schemas/schema");
const user_schema_1 = require("../user/schemas/user.schema");
const schema_2 = require("../postjob/schemas/schema");
let JobBidService = class JobBidService {
    constructor(model, userModel, postJobModel) {
        this.model = model;
        this.userModel = userModel;
        this.postJobModel = postJobModel;
    }
    async findAll(query) {
        const count = await this.model.find(query.filter).count().exec();
        const data = await this.model
            .find(query.filter)
            .sort(query.sort)
            .skip(query.skip)
            .limit(query.limit)
            .exec();
        return { count: count, data: data };
    }
    async findOne(id) {
        return await this.model.findById(id).exec();
    }
    async create(createJobBidDto, jobSeekerId) {
        console.log(createJobBidDto.jobId);
        const postJob = await this.postJobModel
            .findById(createJobBidDto.jobId)
            .exec();
        console.log(createJobBidDto);
        return await new this.model(Object.assign(Object.assign({}, createJobBidDto), { createdAt: new Date(), jobSeekerId: jobSeekerId, employerId: postJob.employerId })).save();
    }
    async update(id, updateJobBidDto, userId) {
        const record = await this.model.findById(id).exec();
        if (record.jobSeekerId !== userId) {
            throw new Error('This is not your record');
        }
        return await this.model.findByIdAndUpdate(id, updateJobBidDto).exec();
    }
    async findOneUser(id) {
        return await this.userModel.findById(id).exec();
    }
    async delete(id, userId) {
        const record = await this.model.findById(id).exec();
        if (record.jobSeekerId !== userId) {
            throw new Error('This is not your record');
        }
        return await this.model.findByIdAndDelete(id).exec();
    }
};
JobBidService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schema_1.JobBid.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(schema_2.PostJob.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], JobBidService);
exports.JobBidService = JobBidService;
//# sourceMappingURL=service.js.map