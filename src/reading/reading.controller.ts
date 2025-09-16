import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadingService } from './reading.service';
import { ReadingDTO } from '../dto/reading.dto';
import { Reading } from '../infra/database/entity/reading.entity';

@ApiTags('Readings')
@Controller('reading')
export class ReadingController {
  constructor(private readonly readingService: ReadingService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova leitura vinculada a um hidrômetro' })
  @ApiResponse({
    status: 201,
    description: 'Leitura criada com sucesso',
    type: Reading,
  })
  @ApiResponse({ status: 404, description: 'Hidrômetro não encontrado' })
  async create(@Body() body: ReadingDTO): Promise<Reading> {
    return this.readingService.createReading(body);
  }
}
