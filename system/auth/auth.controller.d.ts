import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/create-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginAuthDto: LoginAuthDto, req: any): Promise<string>;
    getCaptcha(res: any): void;
}
