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
exports.DictService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const dict_entity_1 = require("./entities/dict.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const IHttp_1 = require("../../common/model/IHttp");
const api_exception_1 = require("../../common/filter/http-exception/api.exception");
let DictService = class DictService {
    constructor(dictRepository) {
        this.dictRepository = dictRepository;
    }
    async create(createDictDto) {
        const dict = await this.dictRepository.create(createDictDto);
        try {
            await this.dictRepository.save(dict);
            return '添加成功';
        }
        catch (error) {
            throw new common_2.HttpException(error, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll(params) {
        try {
            const { keyword, dictType, pageNumber, pageSize } = params;
            const dictList = await this.dictRepository.findAndCount({
                skip: pageNumber - 1,
                take: pageSize,
                where: {
                    label: (0, typeorm_2.Like)(`%${keyword}%`),
                    dictType: dictType || null,
                },
                order: {
                    dictType: 'ASC',
                },
            });
            return {
                data: dictList[0],
                total: dictList[1],
            };
        }
        catch (error) {
            throw new common_2.HttpException(error, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        const dict = await this.dictRepository.findOne({
            where: {
                id,
            },
        });
        if (!dict)
            throw new api_exception_1.ApiException('未找到此字典', IHttp_1.ApiErrorCode.ERROR_OTHER);
        return dict;
    }
    async update(updateDictDto) {
        try {
            return await this.dictRepository.save(updateDictDto);
        }
        catch (error) {
            throw new common_2.HttpException(error, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        const dict = await this.dictRepository.findOne({
            where: { id },
        });
        if (!dict)
            throw new api_exception_1.ApiException(`字典不存在,删除失败`, IHttp_1.ApiErrorCode.ERROR_OTHER);
        await this.dictRepository.remove(dict);
        return `删除字典成功`;
    }
    async findAllDirectory() {
        try {
            const dictList = await this.dictRepository
                .createQueryBuilder('dict')
                .select('dict.dictType')
                .addSelect('dict.dictTypeDesc')
                .groupBy('dict.dictType')
                .getMany();
            return dictList;
        }
        catch (error) {
            throw new common_2.HttpException(error, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findByTypes(dictTypes) {
        try {
            const dictList = await this.dictRepository.find({
                select: ['label', 'id'],
                where: {
                    dictType: (0, typeorm_2.In)(dictTypes),
                    status: 1,
                },
                order: {
                    sortNum: 'ASC',
                },
            });
            const dictObj = {};
            dictTypes.map((dictType) => {
                dictObj[dictType] = dictList.filter((e) => e.dictType == dictType);
            });
            return dictObj;
        }
        catch (error) {
            throw new common_2.HttpException(error, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.DictService = DictService;
exports.DictService = DictService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(dict_entity_1.Dict)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DictService);
//# sourceMappingURL=dict.service.js.map