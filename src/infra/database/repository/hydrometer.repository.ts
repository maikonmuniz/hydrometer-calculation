import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Hydrometer } from '../entity/hydrometer.entity';

@Injectable()
export class HydrometerRepository extends Repository<Hydrometer> {}
