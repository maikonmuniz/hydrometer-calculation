import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Tower } from './tower.entity';

@Entity()
export class Condominium {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  andress: string;

  @Column()
  postalCode: string;

  @Column()
  street: string;

  @Column()
  num: number;

  @Column()
  neighborhood: string;

  @Column()
  state: string;

  @Column()
  uf: string;

  @OneToMany(() => Tower, (tower) => tower.condominium, { cascade: true })
  tower: Tower[];
}
