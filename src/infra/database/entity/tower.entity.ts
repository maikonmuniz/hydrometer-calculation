import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Condominium } from './condominium.entity';
import { Apartment } from './apartment.entity';

@Entity()
export class Tower {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Condominium, (condominium) => condominium.towers, {
    onDelete: 'CASCADE',
  })
  condominium?: Condominium;

  @OneToMany(() => Apartment, (apartment) => apartment.tower, {
    cascade: true,
  })
  apartments: Apartment[];
}
