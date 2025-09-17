import { Module } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { ApartmentController } from './apartment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartment } from 'src/infra/database/entity/apartment.entity';
import { Tower } from 'src/infra/database/entity/tower.entity';
import { ApartmentRepository } from '../infra/database/repository/apartment.repository';
import { TowerRepository } from '../infra/database/repository/tower.repository';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Apartment, Tower])],
  controllers: [ApartmentController],
  providers: [
    ApartmentService,
    {
      provide: ApartmentRepository,
      useFactory: (dataSource: DataSource) =>
        new ApartmentRepository(dataSource),
      inject: [DataSource],
    },
    {
      provide: TowerRepository,
      useFactory: (dataSource: DataSource) => new TowerRepository(dataSource),
      inject: [DataSource],
    },
  ],
})
export class ApartmentModule {}
