import { Module } from '@nestjs/common';
import { HydrometerService } from './hydrometer.service';
import { HydrometerController } from './hydrometer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hydrometer } from 'src/infra/database/entity/hydrometer.entity';
import { Apartment } from 'src/infra/database/entity/apartment.entity';
import { HydrometerRepository } from 'src/infra/database/repository/hydrometer.repository';
import { ApartmentRepository } from 'src/infra/database/repository/apartment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Hydrometer, Apartment])],
  controllers: [HydrometerController],
  providers: [HydrometerService, HydrometerRepository, ApartmentRepository],
})
export class HydrometerModule {}
