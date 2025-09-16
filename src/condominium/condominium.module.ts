import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CondominiumService } from './condominium.service';
import { CondominiumController } from './condominium.controller';
import { Condominium } from '../infra/database/entity/condominium.entity';
import { Tower } from '../infra/database/entity/tower.entity';
import { CondominiumRepository } from '../infra/database/repository/condominium.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Condominium, Tower])],
  providers: [CondominiumService, CondominiumRepository],
  controllers: [CondominiumController],
})
export class CondominiumModule {}
