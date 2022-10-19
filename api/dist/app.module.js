"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const module_1 = require("./PostJob/module");
const config_1 = require("@nestjs/config");
const module_2 = require("./skill/module");
const module_3 = require("./currency/module");
const module_4 = require("./jobbid/module");
const module_5 = require("./tool/module");
const module_6 = require("./wallet/module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb://admin:123456@localhost:27017/bworks2?authSource=admin&readPreference=primary'),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            module_1.PostJobModule,
            module_2.SkillModule,
            module_3.CurrencyModule,
            module_4.JobBidModule,
            module_5.ToolModule,
            module_6.WalletModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map