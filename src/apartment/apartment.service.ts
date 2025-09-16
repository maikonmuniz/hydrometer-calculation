import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Apartment } from '../infra/database/entity/apartment.entity';
import { Tower } from '../infra/database/entity/tower.entity';
import { ApartmentDTO } from '../dto/apartment.dto';

@Injectable()
export class ApartmentService {
  constructor(
    @InjectRepository(Apartment)
    private apartmentRepository: Repository<Apartment>,

    @InjectRepository(Tower)
    private towerRepository: Repository<Tower>,
  ) {}

  async createApartment(body: ApartmentDTO): Promise<Apartment> {
    const tower = await this.towerRepository.findOne({
      where: { id: body.towerId },
    });

    if (!tower) {
      throw new NotFoundException('Torre não encontrada');
    }

    const apartment = this.apartmentRepository.create({
      tower,
    });

    return await this.apartmentRepository.save(apartment);
  }
}
