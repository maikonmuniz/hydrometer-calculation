import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tower } from '../entity/tower.entity';

@Injectable()
export class TowerRepository extends Repository<Tower> {}
