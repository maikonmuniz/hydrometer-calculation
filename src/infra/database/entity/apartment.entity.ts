import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Tower } from './tower.entity';

@Entity()
export class Apartment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tower, (tower) => tower.apartments, {
    onDelete: 'CASCADE',
  })
  tower: Tower;
}
