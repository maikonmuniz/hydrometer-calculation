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
      apartment,
    });

    return await this.hydrometerRepository.save(hydrometer);
  }

  async updateHydrometer(id: number, body: HydrometerDTO): Promise<Hydrometer> {
    const hydrometer = await this.hydrometerRepository.findOne({
      where: { id },
      relations: ['apartment'],
    });

    if (!hydrometer) {
      throw new NotFoundException(`Hidrômetro com id ${id} não encontrado`);
    }

    if (body.apartmentId) {
      const apartment = await this.apartmentRepository.findOne({
        where: { id: body.apartmentId },
      });

      if (!apartment) {
        throw new NotFoundException('Apartamento não encontrado');
      }

      hydrometer.apartment = apartment;
    }

    Object.assign(hydrometer, body);

    return this.hydrometerRepository.save(hydrometer);
  }

  async deleteHydrometer(id: number): Promise<{ message: string }> {
    const hydrometer = await this.hydrometerRepository.findOne({
      where: { id },
    });

    if (!hydrometer) {
      throw new NotFoundException(`Hidrômetro com id ${id} não encontrado`);
    }

    await this.hydrometerRepository.remove(hydrometer);

    return { message: `Hidrômetro com id ${id} removido com sucesso` };
  }
}
