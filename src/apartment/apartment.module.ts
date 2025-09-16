import { Module } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { ApartmentController } from './apartment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartment } from 'src/infra/database/entity/apartment.entity';
import { Tower } from 'src/infra/database/entity/tower.entity';
import { ApartmentRepository } from '../infra/database/repository/apartment.repository';
import { TowerRepository } from '../infra/database/repository/tower.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Apartment, Tower])],
  controllers: [ApartmentController],
  providers: [ApartmentService, ApartmentRepository, TowerRepository],
})
export class ApartmentModule {}
