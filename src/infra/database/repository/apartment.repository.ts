import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Apartment } from '../entity/apartment.entity';
import { Reading } from '../entity/reading.entity';

@Injectable()
export class ApartmentRepository extends Repository<Apartment> {
  constructor(private dataSource: DataSource) {
    super(Apartment, dataSource.createEntityManager());
  }

  async findReadingsByApartmentId(apartmentId: number): Promise<Reading[]> {
    return this.dataSource
      .getRepository(Reading)
      .createQueryBuilder('re')
      .innerJoin('re.hydrometer', 'hy')
      .innerJoin('hy.apartment', 'ap')
      .select(['re', 'ap.id'])
      .where('ap.id = :apartmentId', { apartmentId })
      .getRawMany();
  }

  async dateFilterByApartment(
    id: number,
    dateStart: string,
    dataEnd: string,
  ): Promise<any[]> {
    const readings = await this.dataSource.query(
      `
      SELECT sum(reading.consumption) as consumption
      FROM reading
      INNER JOIN hydrometer ON reading.hydrometerId = hydrometer.id
      INNER JOIN apartment ON hydrometer.apartmentId = apartment.id
      WHERE apartment.id = ? and reading.readingDate BETWEEN ? AND ?;
      `,
      [id, dateStart, dataEnd],
    );

    if (!readings.length) {
      throw new NotFoundException('Nenhuma informação nesse intevalor');
    }

    return readings;
  }
}
