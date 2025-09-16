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
}
