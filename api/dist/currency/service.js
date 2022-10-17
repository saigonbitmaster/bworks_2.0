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
exports.CurrencyService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schema_1 = require("./schemas/schema");
let CurrencyService = class CurrencyService {
    constructor(model) {
        this.model = model;
    }
    async findAll(filter, sort, skip, limit) {
        const count = await this.model.find(filter).count().exec();
        const data = await this.model
            .find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .exec();
        const result = { count: count, data: data };
        return result;
    }
    async findOne(id) {
        return await this.model.findById(id).exec();
    }
    async create(createCurrencyDto) {
        const employeeId = '634160d80609134ad2fa5efa';
        return await new this.model(Object.assign(Object.assign({}, createCurrencyDto), { createdAt: new Date(), employeeId: employeeId })).save();
    }
    async update(id, updateCurrencyDto) {
        return await this.model.findByIdAndUpdate(id, updateCurrencyDto).exec();
    }
    async delete(id) {
        return await this.model.findByIdAndDelete(id).exec();
    }
};
CurrencyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schema_1.Currency.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CurrencyService);
exports.CurrencyService = CurrencyService;
//# sourceMappingURL=service.js.map