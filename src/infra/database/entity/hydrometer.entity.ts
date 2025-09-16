import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Apartment } from './apartment.entity';
import { Reading } from './reading.entity';

@Entity()
export class Hydrometer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Apartment, (apartment) => apartment.hydrometers, {
    onDelete: 'CASCADE',
  })
  apartment: Apartment;

  @OneToMany(() => Reading, (reading) => reading.hydrometer)
  readings: Reading[];
}
