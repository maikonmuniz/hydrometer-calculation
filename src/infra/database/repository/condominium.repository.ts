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

  async dateFilterByCondominium(
    id: number,
    dateStart: string,
    dateEnd: string,
  ): Promise<any[]> {
    const readings = await this.dataSource.query(
      `
      SELECT sum(reading.consumption) as consumption
      FROM reading
      INNER JOIN hydrometer ON reading.hydrometerId = hydrometer.id
      INNER JOIN apartment ON hydrometer.apartmentId = apartment.id
      INNER JOIN tower on apartment.towerId = tower.id
      INNER JOIN condominium on tower.condominiumId = condominium.id
      WHERE condominium.id = ? and reading.readingDate BETWEEN ? AND ?;

      `,
      [id, dateStart, dateEnd],
    );

    if (!readings.length) {
      throw new NotFoundException('Nenhuma consumo de gás encontrado!');
    }

    return readings;
  }
}
