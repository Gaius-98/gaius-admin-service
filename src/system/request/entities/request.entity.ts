import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('request')
export class Request {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 32, name: 'api_name' })
  apiName: string;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'create_time',
  })
  createTime: Date;
  @Column({ default: 1 })
  status: number;
  @Column()
  url: string;
  @Column({ type: 'json', nullable: true })
  params: any[];
  @Column({ type: 'json', nullable: true })
  body: any[];
  @Column()
  method: string;
  @Column({ type: 'json', nullable: true })
  headers: any[];
  @Column({ nullable: true })
  desc: string;
}
