import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/infra/database/entity/person.entity';
import { Apartment } from 'src/infra/database/entity/apartment.entity';
import { PersonRepository } from 'src/infra/database/repository/person.repository';
import { ApartmentRepository } from 'src/infra/database/repository/apartment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Person, Apartment])],
  controllers: [PersonController],
  providers: [PersonService, PersonRepository, ApartmentRepository],
})
export class PersonModule {}
