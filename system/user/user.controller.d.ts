import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<string>;
    getUserInfo(username: string): Promise<import("./entities/user.entity").User>;
    update(updateUserDto: UpdateUserDto): Promise<UpdateUserDto & import("./entities/user.entity").User>;
    remove(username: string): Promise<string>;
    getUserList(params: SearchUserDto): Promise<{
        data: import("./entities/user.entity").User[];
        total: number;
    }>;
}
