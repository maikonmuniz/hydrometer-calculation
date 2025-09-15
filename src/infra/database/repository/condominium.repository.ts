import { Injectable } from '@nestjs/common';
import { Condominium } from '../entity/condominium.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CondominiumRepository extends Repository<Condominium> {}
