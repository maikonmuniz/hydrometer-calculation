import { Module } from '@nestjs/common';
import { TowerService } from './tower.service';
import { TowerController } from './tower.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Condominium } from '../infra/database/entity/condominium.entity';
import { Tower } from '../infra/database/entity/tower.entity';
import { CondominiumRepository } from '../infra/database/repository/condominium.repository';
import { TowerRepository } from '../infra/database/repository/tower.repository';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Condominium, Tower])],
  controllers: [TowerController],
  providers: [
    TowerService,
    {
      provide: CondominiumRepository,
      useFactory: (dataSource: DataSource) =>
        new CondominiumRepository(dataSource),
      inject: [DataSource],
    },
    {
      provide: TowerRepository,
      useFactory: (dataSource: DataSource) => new TowerRepository(dataSource),
      inject: [DataSource],
    },
  ],
})
export class TowerModule {}
