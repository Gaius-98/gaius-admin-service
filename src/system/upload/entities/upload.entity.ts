import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('upload')
export class Upload {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'file_name' })
  fileName: string;
  @Column({ name: 'original_name' })
  originalName: string;
  @Column({ name: 'size' })
  size: number;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'create_time',
  })
  createTime: Date;
}
