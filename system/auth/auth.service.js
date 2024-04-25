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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const api_exception_1 = require("../../common/filter/http-exception/api.exception");
const IHttp_1 = require("../../common/model/IHttp");
const encrypt_1 = require("../../utils/encrypt");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const svgCaptcha = require("svg-captcha");
let AuthService = class AuthService {
    constructor(userSrv, jwtSrv, configSrv) {
        this.userSrv = userSrv;
        this.jwtSrv = jwtSrv;
        this.configSrv = configSrv;
    }
    async login(loginAuthDto, captchaCode) {
        const { username, password, captcha } = loginAuthDto;
        const user = await this.userSrv.findOne(username);
        if (captchaCode == captcha) {
            if (user) {
                const { salt, password: realPassword } = user;
                if (realPassword == (0, encrypt_1.default)(password, salt)) {
                    try {
                        return await this.jwtSrv.signAsync({ username }, {
                            secret: this.configSrv.get('JWT_SECRET'),
                        });
                    }
                    catch (error) {
                        throw new api_exception_1.ApiException(error, IHttp_1.ApiErrorCode.ERROR_OTHER);
                    }
                }
                else {
                    throw new api_exception_1.ApiException('密码错误', IHttp_1.ApiErrorCode.ERROR_OTHER);
                }
            }
            else {
                throw new api_exception_1.ApiException('此用户不存在', IHttp_1.ApiErrorCode.ERROR_OTHER);
            }
        }
        else {
            throw new api_exception_1.ApiException('验证码错误', IHttp_1.ApiErrorCode.ERROR_OTHER);
        }
    }
    createCaptcha() {
        return svgCaptcha.createMathExpr({
            size: 4,
            noise: 0,
            width: 80,
            height: 28,
            fontSize: 35,
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map