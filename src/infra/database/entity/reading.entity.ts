import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Hydrometer } from './hydrometer.entity';

export enum ReadingPeriodicity {
  DAILY = 'dia',
  WEEKLY = 'semanal',
  MONTHLY = 'mensal',
}

@Entity()
export class Reading {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Hydrometer, (hydrometer) => hydrometer.readings, {
    onDelete: 'CASCADE',
  })
  hydrometer: Hydrometer;

  @Column({ type: 'date' })
  readingDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  consumption: number;

  @Column({
    type: 'enum',
    enum: ReadingPeriodicity,
  })
  periodicity: ReadingPeriodicity;
}
