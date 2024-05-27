export class CreateTableDto {
  name: string;
  description?: string;
  createTime?: string;
  status: number;
  columns: any[];
  global: any;
  dataSource: any;
  variablePool: any[];
}
