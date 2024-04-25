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
exports.DictController = void 0;
const common_1 = require("@nestjs/common");
const dict_service_1 = require("./dict.service");
const create_dict_dto_1 = require("./dto/create-dict.dto");
const update_dict_dto_1 = require("./dto/update-dict.dto");
const search_dict_dto_1 = require("./dto/search-dict.dto");
let DictController = class DictController {
    constructor(dictService) {
        this.dictService = dictService;
    }
    create(createDictDto) {
        return this.dictService.create(createDictDto);
    }
    findAll(params) {
        return this.dictService.findAll(params);
    }
    findOne(id) {
        return this.dictService.findOne(id);
    }
    update(updateDictDto) {
        return this.dictService.update(updateDictDto);
    }
    remove(id) {
        return this.dictService.remove(id);
    }
    findByType(dictTypes) {
        return this.dictService.findByTypes(dictTypes);
    }
    findDictTypeList() {
        return this.dictService.findAllDirectory();
    }
};
exports.DictController = DictController;
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dict_dto_1.CreateDictDto]),
    __metadata("design:returntype", void 0)
], DictController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_dict_dto_1.SearchDictDto]),
    __metadata("design:returntype", void 0)
], DictController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('detail'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DictController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_dict_dto_1.UpdateDictDto]),
    __metadata("design:returntype", void 0)
], DictController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('remove'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DictController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('dictByType'),
    __param(0, (0, common_1.Query)('dictType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], DictController.prototype, "findByType", null);
__decorate([
    (0, common_1.Get)('dictTypeList'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DictController.prototype, "findDictTypeList", null);
exports.DictController = DictController = __decorate([
    (0, common_1.Controller)('dict'),
    __metadata("design:paramtypes", [dict_service_1.DictService])
], DictController);
//# sourceMappingURL=dict.controller.js.map