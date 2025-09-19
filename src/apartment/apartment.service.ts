import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Apartment } from '../infra/database/entity/apartment.entity';
import { Tower } from '../infra/database/entity/tower.entity';
import { ApartmentDTO } from '../dto/apartment.dto';
import { ApartmentRepository } from '../infra/database/repository/apartment.repository';

@Injectable()
export class ApartmentService {
  constructor(
    @InjectRepository(Apartment)
    private apartmentRepository: Repository<Apartment>,

    @InjectRepository(Tower)
    private towerRepository: Repository<Tower>,

    private customApartmentRepository: ApartmentRepository,
  ) {}

  async createApartment(body: ApartmentDTO): Promise<Apartment> {
    const tower = await this.towerRepository.findOne({
      where: { id: body.towerId },
    });

    if (!tower) {
      throw new NotFoundException('Torre não encontrada');
    }

    const apartment = this.apartmentRepository.create({
      ...body,
      tower,
    });

    return await this.apartmentRepository.save(apartment);
  }

  async getReadingsByApartmentId(apartmentId: number) {
    const readings =
      await this.customApartmentRepository.findReadingsByApartmentId(
        apartmentId,
      );

    if (!readings.length) {
      throw new NotFoundException(
        `Nenhuma leitura encontrada para o apartamento ${apartmentId}`,
      );
    }

    return readings;
  }

  async gasConsumptionByApartment(
    id: number,
    dateStart: string,
    dataEnd: string,
  ) {
    const gasConsumption = this.customApartmentRepository.dateFilterByApartment(
      id,
      dateStart,
      dataEnd,
    );
    return gasConsumption;
  }

  async updateApartment(id: number, body: ApartmentDTO): Promise<Apartment> {
    const apartment = await this.apartmentRepository.findOne({
      where: { id },
      relations: ['tower'],
    });

    if (!apartment) {
      throw new NotFoundException(`Apartamento com id ${id} não encontrado`);
    }

    if (body.towerId) {
      const tower = await this.towerRepository.findOne({
        where: { id: body.towerId },
      });
      if (!tower) {
        throw new NotFoundException('Torre não encontrada');
      }
      apartment.tower = tower;
    }

    Object.assign(apartment, body);

    return await this.apartmentRepository.save(apartment);
  }

  async deleteApartment(id: number): Promise<{ message: string }> {
    const apartment = await this.apartmentRepository.findOne({
      where: { id },
    });

    if (!apartment) {
      throw new NotFoundException(`Apartamento com id ${id} não encontrado`);
    }

    await this.apartmentRepository.remove(apartment);

    return { message: `Apartamento com id ${id} removido com sucesso` };
  }
}
