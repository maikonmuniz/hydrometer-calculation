import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Apartment } from './apartment.entity';

export enum PersonType {
  OWNER = 'dono',
  TENANT = 'inquilino',
  RESIDENT = 'morador',
}

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({
    type: 'enum',
    enum: PersonType,
    default: PersonType.RESIDENT,
  })
  type: PersonType;

  @ManyToOne(() => Apartment, (apartment) => apartment.people, {
    onDelete: 'CASCADE',
  })
  apartment: Apartment;
}
