import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import encrypt from '../../../utils/encrypt';
@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 32 })
  username: string;
  @Column()
  password: string;
  @Column({ nullable: true })
  email: string;
  @Column({ nullable: true })
  role: string;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'create_time',
  })
  createTime: Date;
  @Column()
  name: string;
  @Column({ nullable: true })
  avatar: string;
  @Column()
  salt: string;
  @BeforeInsert()
  beforeInsert() {
    this.salt = (Math.random() * 10000).toFixed(0);
    this.password = encrypt(this.password, this.salt);
  }
}
