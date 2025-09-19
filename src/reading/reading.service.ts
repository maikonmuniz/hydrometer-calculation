import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reading } from '../infra/database/entity/reading.entity';
import { Hydrometer } from '../infra/database/entity/hydrometer.entity';
import { ReadingDTO } from '../dto/reading.dto';

@Injectable()
export class ReadingService {
  constructor(
    @InjectRepository(Reading)
    private readingRepository: Repository<Reading>,

    @InjectRepository(Hydrometer)
    private hydrometerRepository: Repository<Hydrometer>,
  ) {}

  async createReading(body: ReadingDTO): Promise<Reading> {
    const hydrometer = await this.hydrometerRepository.findOne({
      where: { id: body.hydrometerId },
    });

    if (!hydrometer) {
      throw new NotFoundException('Hidrômetro não encontrado');
    }

    const reading = this.readingRepository.create({
      hydrometer,
      readingDate: new Date(body.readingDate),
      consumption: body.consumption,
      periodicity: body.periodicity,
    });

    return await this.readingRepository.save(reading);
  }

  async updateReading(id: number, body: ReadingDTO): Promise<Reading> {
    const reading = await this.readingRepository.findOne({
      where: { id },
      relations: ['hydrometer'],
    });

    if (!reading) {
      throw new NotFoundException(`Leitura com id ${id} não encontrada`);
    }

    if (body.hydrometerId) {
      const hydrometer = await this.hydrometerRepository.findOne({
        where: { id: body.hydrometerId },
      });

      if (!hydrometer) {
        throw new NotFoundException('Hidrômetro não encontrado');
      }

      reading.hydrometer = hydrometer;
    }

    Object.assign(reading, {
      readingDate: body.readingDate
        ? new Date(body.readingDate)
        : reading.readingDate,
      consumption: body.consumption ?? reading.consumption,
      periodicity: body.periodicity ?? reading.periodicity,
    });

    return this.readingRepository.save(reading);
  }

  async deleteReading(id: number): Promise<{ message: string }> {
    const reading = await this.readingRepository.findOne({
      where: { id },
    });

    if (!reading) {
      throw new NotFoundException(`Leitura com id ${id} não encontrada`);
    }

    await this.readingRepository.remove(reading);

    return { message: `Leitura com id ${id} removida com sucesso` };
  }
}
