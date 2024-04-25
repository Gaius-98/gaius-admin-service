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
exports.RequestService = void 0;
const common_1 = require("@nestjs/common");
const request_entity_1 = require("./entities/request.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const common_2 = require("@nestjs/common");
const common_3 = require("@nestjs/common");
const IHttp_1 = require("../../common/model/IHttp");
const api_exception_1 = require("../../common/filter/http-exception/api.exception");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let RequestService = class RequestService {
    constructor(requestRepository, http) {
        this.requestRepository = requestRepository;
        this.http = http;
    }
    async create(createRequestDto) {
        const request = await this.requestRepository.create(createRequestDto);
        try {
            await this.requestRepository.save(request);
            return '添加成功';
        }
        catch (error) {
            throw new common_2.HttpException(error, common_3.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll(params) {
        try {
            const { keyword, pageNumber, pageSize, url } = params;
            const list = await this.requestRepository.findAndCount({
                select: ['id', 'status', 'apiName', 'createTime', 'method', 'url'],
                where: {
                    apiName: (0, typeorm_2.Like)(`%${keyword}%`),
                    url: (0, typeorm_2.Like)(`%${url}%`),
                },
                order: {
                    createTime: 'ASC',
                },
                skip: pageNumber - 1,
                take: pageSize,
            });
            return {
                data: list[0],
                total: list[1],
            };
        }
        catch (error) {
            throw new common_2.HttpException(error, common_3.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            const request = await this.requestRepository.findOne({
                where: {
                    id,
                },
            });
            return await request;
        }
        catch (error) {
            throw new common_2.HttpException(error, common_3.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(updateRequestDto) {
        try {
            return await this.requestRepository.save(updateRequestDto);
        }
        catch (error) {
            throw new common_2.HttpException(error, common_3.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        const request = await this.requestRepository.findOne({
            where: { id },
        });
        if (!request)
            throw new api_exception_1.ApiException(`API不存在,删除失败`, IHttp_1.ApiErrorCode.ERROR_OTHER);
        await this.requestRepository.remove(request);
        return `删除API成功`;
    }
    async proxy(id) {
        const request = await this.requestRepository.findOne({
            where: { id, status: 1 },
        });
        if (!request)
            throw new api_exception_1.ApiException(`API不存在,调用失败`, IHttp_1.ApiErrorCode.ERROR_OTHER);
        const { url, method, params, body, headers } = request;
        const requestInfo = {
            url,
            method,
            params: this.transform(params),
            data: this.transform(body),
            headers: this.transform(headers),
        };
        Reflect.deleteProperty(requestInfo, method == 'get' ? 'data' : 'params');
        try {
            const res = await (0, rxjs_1.firstValueFrom)(this.http.request(requestInfo));
            return res.data;
        }
        catch (error) {
            throw new api_exception_1.ApiException(error, IHttp_1.ApiErrorCode.ERROR_OTHER);
        }
    }
    transform(data) {
        const obj = {};
        data
            .filter((e) => !!e.key)
            .map((item) => {
            obj[item.key] = item.value;
        });
        return obj;
    }
};
exports.RequestService = RequestService;
exports.RequestService = RequestService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(request_entity_1.Request)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        axios_1.HttpService])
], RequestService);
//# sourceMappingURL=request.service.js.map