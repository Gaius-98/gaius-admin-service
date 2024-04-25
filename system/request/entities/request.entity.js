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
exports.Request = void 0;
const typeorm_1 = require("typeorm");
let Request = class Request {
};
exports.Request = Request;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Request.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 32, name: 'api_name' }),
    __metadata("design:type", String)
], Request.prototype, "apiName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'create_time',
    }),
    __metadata("design:type", Date)
], Request.prototype, "createTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], Request.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Request.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Request.prototype, "params", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Request.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Request.prototype, "method", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Request.prototype, "headers", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Request.prototype, "desc", void 0);
exports.Request = Request = __decorate([
    (0, typeorm_1.Entity)('request')
], Request);
//# sourceMappingURL=request.entity.js.map