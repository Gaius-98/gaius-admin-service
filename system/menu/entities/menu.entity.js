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
exports.Menu = void 0;
const typeorm_1 = require("typeorm");
let Menu = class Menu {
};
exports.Menu = Menu;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Menu.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 32 }),
    __metadata("design:type", String)
], Menu.prototype, "label", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'parent_id', nullable: true }),
    __metadata("design:type", String)
], Menu.prototype, "pid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'menu_type' }),
    __metadata("design:type", String)
], Menu.prototype, "menuType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'route_address', nullable: true }),
    __metadata("design:type", String)
], Menu.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Menu.prototype, "desc", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Menu.prototype, "icon", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sort_num' }),
    __metadata("design:type", Number)
], Menu.prototype, "sortNum", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Menu.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Menu.prototype, "openType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'create_time',
    }),
    __metadata("design:type", Date)
], Menu.prototype, "createTime", void 0);
exports.Menu = Menu = __decorate([
    (0, typeorm_1.Entity)('menu')
], Menu);
//# sourceMappingURL=menu.entity.js.map