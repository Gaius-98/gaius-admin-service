import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<string>;
    findAll(params: SearchUserDto): Promise<{
        data: User[];
        total: number;
    }>;
    findOne(username: string): Promise<User>;
    getUserInfo(username: string): Promise<User>;
    update(updateUserDto: UpdateUserDto): Promise<UpdateUserDto & User>;
    remove(username: string): Promise<string>;
    getRoleIdByUser(username: string): Promise<User>;
}
