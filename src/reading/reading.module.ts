import { Module } from '@nestjs/common';
import { ReadingService } from './reading.service';
import { ReadingController } from './reading.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reading } from 'src/infra/database/entity/reading.entity';
import { Hydrometer } from 'src/infra/database/entity/hydrometer.entity';
import { ReadingRepository } from 'src/infra/database/repository/reading.repository';
import { HydrometerRepository } from 'src/infra/database/repository/hydrometer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Reading, Hydrometer])],
  controllers: [ReadingController],
  providers: [ReadingService, ReadingRepository, HydrometerRepository],
})
export class ReadingModule {}
