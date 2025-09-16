import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Tower } from './tower.entity';
import { Person } from './person.entity';
import { Hydrometer } from './hydrometer.entity';

@Entity()
export class Apartment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tower, (tower) => tower.apartments, {
    onDelete: 'CASCADE',
  })
  tower: Tower;

  @OneToMany(() => Person, (person) => person.apartment)
  people: Person[];

  @OneToMany(() => Hydrometer, (hydrometer) => hydrometer.apartment)
  hydrometers: Hydrometer[];
}
