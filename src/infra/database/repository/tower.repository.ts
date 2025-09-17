import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Tower } from '../entity/tower.entity';

@Injectable()
export class TowerRepository extends Repository<Tower> {
  constructor(private dataSource: DataSource) {
    super(Tower, dataSource.createEntityManager());
  }

  async getReadingsByTowerId(towerId: number): Promise<any[]> {
    const readings = await this.dataSource.query(
      `
      SELECT reading.*
      FROM reading
      INNER JOIN hydrometer ON reading.hydrometerId = hydrometer.id
      INNER JOIN apartment ON hydrometer.apartmentId = apartment.id
      INNER JOIN tower ON apartment.towerId = tower.id
      WHERE tower.id = ?
      `,
      [towerId],
    );

    if (!readings.length) {
      throw new NotFoundException('Nenhuma leitura encontrada para esta torre');
    }

    return readings;
  }
}
