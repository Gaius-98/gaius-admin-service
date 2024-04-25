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
exports.RequestController = void 0;
const common_1 = require("@nestjs/common");
const request_service_1 = require("./request.service");
const create_request_dto_1 = require("./dto/create-request.dto");
const update_request_dto_1 = require("./dto/update-request.dto");
const search_request_dto_1 = require("./dto/search-request.dto");
const public_decorator_1 = require("../../public/public.decorator");
let RequestController = class RequestController {
    constructor(requestService) {
        this.requestService = requestService;
    }
    create(createRequestDto) {
        return this.requestService.create(createRequestDto);
    }
    findAll(params) {
        return this.requestService.findAll(params);
    }
    findOne(id) {
        return this.requestService.findOne(id);
    }
    update(updateRequestDto) {
        return this.requestService.update(updateRequestDto);
    }
    remove(id) {
        return this.requestService.remove(id);
    }
    proxy(id) {
        return this.requestService.proxy(id);
    }
};
exports.RequestController = RequestController;
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_request_dto_1.CreateRequestDto]),
    __metadata("design:returntype", void 0)
], RequestController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_request_dto_1.SearchRequestDto]),
    __metadata("design:returntype", void 0)
], RequestController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('detail'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RequestController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_request_dto_1.UpdateRequestDto]),
    __metadata("design:returntype", void 0)
], RequestController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('remove'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RequestController.prototype, "remove", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('proxy'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RequestController.prototype, "proxy", null);
exports.RequestController = RequestController = __decorate([
    (0, common_1.Controller)('request'),
    __metadata("design:paramtypes", [request_service_1.RequestService])
], RequestController);
//# sourceMappingURL=request.controller.js.map