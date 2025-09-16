import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hydrometer } from '../infra/database/entity/hydrometer.entity';
import { Apartment } from '../infra/database/entity/apartment.entity';
import { HydrometerDTO } from '../dto/hydrometer.dto';

@Injectable()
export class HydrometerService {
  constructor(
    @InjectRepository(Hydrometer)
    private hydrometerRepository: Repository<Hydrometer>,

    @InjectRepository(Apartment)
    private apartmentRepository: Repository<Apartment>,
  ) {}

  async createHydrometer(body: HydrometerDTO): Promise<Hydrometer> {
    const apartment = await this.apartmentRepository.findOne({
      where: { id: body.apartmentId },
    });

    if (!apartment) {
      throw new NotFoundException('Apartamento não encontrado');
    }

    const hydrometer = this.hydrometerRepository.create({
      id: body.apartmentId,
      apartment,
    });

    return await this.hydrometerRepository.save(hydrometer);
  }
}
