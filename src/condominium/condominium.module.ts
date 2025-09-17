import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CondominiumService } from './condominium.service';
import { CondominiumController } from './condominium.controller';
import { Condominium } from '../infra/database/entity/condominium.entity';
import { Tower } from '../infra/database/entity/tower.entity';
import { CondominiumRepository } from '../infra/database/repository/condominium.repository';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Condominium, Tower])],
  providers: [
    CondominiumService,
    {
      provide: CondominiumRepository,
      useFactory: (dataSource: DataSource) =>
        new CondominiumRepository(dataSource),
      inject: [DataSource],
    },
  ],
  controllers: [CondominiumController],
})
export class CondominiumModule {}
