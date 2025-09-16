import { Injectable } from '@nestjs/common';
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
}
