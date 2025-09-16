import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Apartment } from './apartment.entity';

@Entity()
export class Hydrometer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Apartment, (apartment) => apartment.hydrometers, {
    onDelete: 'CASCADE',
  })
  apartment: Apartment;
}
