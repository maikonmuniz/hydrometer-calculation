import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Reading } from '../entity/reading.entity';

@Injectable()
export class ReadingRepository extends Repository<Reading> {}
