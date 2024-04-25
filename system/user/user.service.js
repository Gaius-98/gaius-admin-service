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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const api_exception_1 = require("../../common/filter/http-exception/api.exception");
const IHttp_1 = require("../../common/model/IHttp");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        const { username } = createUserDto;
        const existUser = await this.userRepository.findOne({
            where: {
                username,
            },
        });
        if (existUser) {
            throw new api_exception_1.ApiException('此用户已存在', IHttp_1.ApiErrorCode.ERROR_OTHER);
        }
        else {
            try {
                const user = await this.userRepository.create(createUserDto);
                await this.userRepository.save(user);
                return '注册成功';
            }
            catch (error) {
                throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async findAll(params) {
        const { pageNumber, pageSize, keyword } = params;
        try {
            const userList = await this.userRepository.findAndCount({
                select: [
                    'avatar',
                    'email',
                    'username',
                    'name',
                    'roleId',
                    'salt',
                    'createTime',
                    'id',
                ],
                skip: pageNumber - 1,
                take: pageSize,
                where: {
                    username: (0, typeorm_2.Like)(`%${keyword}%`),
                },
                order: {
                    createTime: 'ASC',
                },
            });
            return {
                data: userList[0],
                total: userList[1],
            };
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(username) {
        const user = await this.userRepository.findOne({
            select: [
                'avatar',
                'email',
                'username',
                'name',
                'roleId',
                'salt',
                'createTime',
                'password',
                'id',
            ],
            where: { username },
        });
        if (!user)
            throw new api_exception_1.ApiException('用户名不存在', IHttp_1.ApiErrorCode.ERROR_OTHER);
        return user;
    }
    async getUserInfo(username) {
        const user = await this.findOne(username);
        if (!user)
            throw new api_exception_1.ApiException('用户名不存在', IHttp_1.ApiErrorCode.ERROR_OTHER);
        delete user.password;
        return user;
    }
    async update(updateUserDto) {
        try {
            return await this.userRepository.save(updateUserDto);
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(username) {
        const user = await this.userRepository.findOne({
            where: { username },
        });
        if (!user)
            throw new api_exception_1.ApiException(`用户[${username}]不存在,删除失败`, IHttp_1.ApiErrorCode.ERROR_OTHER);
        await this.userRepository.remove(user);
        return `删除用户[${username}]成功`;
    }
    async getRoleIdByUser(username) {
        const users = await this.userRepository.findOne({
            where: { username },
            relations: ['roleId', 'user.role'],
        });
        return users;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map