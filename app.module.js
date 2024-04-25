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
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const user_module_1 = require("./system/user/user.module");
const auth_module_1 = require("./system/auth/auth.module");
const jwt_1 = require("@nestjs/jwt");
const core_1 = require("@nestjs/core");
const auth_guard_1 = require("./auth/auth.guard");
const menu_module_1 = require("./system/menu/menu.module");
const dict_module_1 = require("./system/dict/dict.module");
const path = require("path");
const transform_interceptor_1 = require("./common/interceptor/transform/transform.interceptor");
const role_module_1 = require("./system/role/role.module");
const request_module_1 = require("./system/request/request.module");
const env = process.env.NODE_ENV == 'production' ? 'prod' : 'dev';
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: [
                    env == 'prod' ? path.resolve('.env.prod') : path.resolve('.env.dev'),
                ],
                ignoreEnvFile: false,
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                autoLoadEntities: true,
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT),
                username: process.env.DB_USER,
                password: process.env.DB_PWD,
                database: process.env.DB_DATABASE,
                synchronize: env == 'prod' ? false : true,
            }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => {
                    return {
                        secret: configService.get('JWT_SECRET'),
                        global: true,
                        signOptions: {
                            expiresIn: '1h',
                        },
                    };
                },
            }),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            menu_module_1.MenuModule,
            dict_module_1.DictModule,
            role_module_1.RoleModule,
            request_module_1.RequestModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: transform_interceptor_1.TransformInterceptor,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map