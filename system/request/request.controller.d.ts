import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { SearchRequestDto } from './dto/search-request.dto';
export declare class RequestController {
    private readonly requestService;
    constructor(requestService: RequestService);
    create(createRequestDto: CreateRequestDto): Promise<string>;
    findAll(params: SearchRequestDto): Promise<{
        data: import("./entities/request.entity").Request[];
        total: number;
    }>;
    findOne(id: string): Promise<import("./entities/request.entity").Request>;
    update(updateRequestDto: UpdateRequestDto): Promise<UpdateRequestDto & import("./entities/request.entity").Request>;
    remove(id: string): Promise<string>;
    proxy(id: string): Promise<any>;
}
