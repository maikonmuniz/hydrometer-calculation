import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Person } from '../entity/person.entity';

@Injectable()
export class PersonRepository extends Repository<Person> {}
