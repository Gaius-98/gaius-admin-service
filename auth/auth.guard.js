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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
let AuthGuard = class AuthGuard {
    constructor(jwtSrv, configSrv, reflector) {
        this.jwtSrv = jwtSrv;
        this.configSrv = configSrv;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride('public', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token)
            throw new common_1.HttpException('验证不通过', common_1.HttpStatus.FORBIDDEN);
        try {
            const payload = await this.jwtSrv.verifyAsync(token, {
                secret: this.configSrv.get('JWT_SECRET'),
            });
            request['username'] = payload.username;
        }
        catch (error) {
            throw new common_1.HttpException(`token验证失败,原因:${error}`, common_1.HttpStatus.FORBIDDEN);
        }
        return true;
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        core_1.Reflector])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map