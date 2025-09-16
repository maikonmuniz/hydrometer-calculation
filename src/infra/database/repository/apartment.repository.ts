import { Injectable } from '@nestjs/common';
import { Apartment } from '../entity/apartment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ApartmentRepository extends Repository<Apartment> {}
