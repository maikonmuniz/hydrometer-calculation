import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Condominium } from './condominium.entity';

@Entity()
export class Tower {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Condominium, (condominium) => condominium.towers, {
    onDelete: 'CASCADE',
  })
  condominium?: Condominium;
}
