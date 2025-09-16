import { Module } from '@nestjs/common';
import { TowerService } from './tower.service';
import { TowerController } from './tower.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Condominium } from '../infra/database/entity/condominium.entity';
import { Tower } from '../infra/database/entity/tower.entity';
import { CondominiumRepository } from '../infra/database/repository/condominium.repository';
import { TowerRepository } from '../infra/database/repository/tower.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Condominium, Tower])],
  controllers: [TowerController],
  providers: [TowerService, CondominiumRepository],
})
export class TowerModule {}
