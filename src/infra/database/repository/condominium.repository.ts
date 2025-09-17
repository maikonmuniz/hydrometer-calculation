import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Condominium } from '../entity/condominium.entity';

@Injectable()
export class CondominiumRepository extends Repository<Condominium> {
  constructor(private dataSource: DataSource) {
    super(Condominium, dataSource.createEntityManager());
  }

  async getReadingsByCondominiumId(condominiumId: number): Promise<any[]> {
    const readings = await this.dataSource.query(
      `
      SELECT reading.*
      FROM reading
      INNER JOIN hydrometer ON reading.hydrometerId = hydrometer.id
      INNER JOIN apartment ON hydrometer.apartmentId = apartment.id
      INNER JOIN tower ON apartment.towerId = tower.id
      INNER JOIN condominium ON tower.condominiumId = condominium.id
      WHERE condominium.id = ?
      `,
      [condominiumId],
    );

    if (!readings.length) {
      throw new NotFoundException(
        'Nenhuma leitura encontrada para este condomínio',
      );
    }

    return readings;
  }
}
