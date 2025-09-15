import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Condominium } from './condominium.entity';

@Entity()
export class Tower {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Condominium, (condominium) => condominium.tower, {
    onDelete: 'CASCADE',
  })
  condominium?: Condominium;
}
