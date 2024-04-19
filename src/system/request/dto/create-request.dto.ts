export class CreateRequestDto {
  apiName: string;
  status: number;
  url: string;
  params?: any[];
  body?: any[];
  method: 'get' | 'post';
  headers?: any[];
  desc?: string;
}
