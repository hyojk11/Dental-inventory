import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ItemStatus } from './item-status.enum';
import { User } from '../auth/user.entity';

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  itemname: string;

  @Column()
  manufacturer: string;

  @Column()
  quantity: number;

  @Column()
  status: ItemStatus;

  @Column()
  etc: string;

  @ManyToOne(type => User, user => user.items, { eager: false })
  user: User;
}
