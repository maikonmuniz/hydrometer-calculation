import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
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

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma leitura pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Leitura atualizada com sucesso',
    type: Reading,
  })
  @ApiResponse({ status: 404, description: 'Leitura não encontrada' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ReadingDTO,
  ): Promise<Reading> {
    return this.readingService.updateReading(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma leitura pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Leitura removida com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Leitura não encontrada' })
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.readingService.deleteReading(id);
  }
}
