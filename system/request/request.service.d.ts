import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { SearchRequestDto } from './dto/search-request.dto';
import { Request } from './entities/request.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { ParamsItem, Obj } from './model/IRequest';
export declare class RequestService {
    private requestRepository;
    private http;
    constructor(requestRepository: Repository<Request>, http: HttpService);
    create(createRequestDto: CreateRequestDto): Promise<string>;
    findAll(params: SearchRequestDto): Promise<{
        data: Request[];
        total: number;
    }>;
    findOne(id: string): Promise<Request>;
    update(updateRequestDto: UpdateRequestDto): Promise<UpdateRequestDto & Request>;
    remove(id: string): Promise<string>;
    proxy(id: string): Promise<any>;
    transform(data: ParamsItem[]): Obj;
}
