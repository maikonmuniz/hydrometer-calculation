import {
  Controller,
  Post,
  Body,
  Get,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApartmentService } from './apartment.service';
import { ApartmentDTO } from '../dto/apartment.dto';
import { Apartment } from '../infra/database/entity/apartment.entity';
import { Reading } from 'src/infra/database/entity/reading.entity';

@ApiTags('Apartments')
@Controller('apartment')
export class ApartmentController {
  constructor(private readonly apartmentService: ApartmentService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo apartamento vinculado a uma torre' })
  @ApiResponse({
    status: 201,
    description: 'Apartamento criado com sucesso',
    type: Apartment,
  })
  @ApiResponse({ status: 404, description: 'Torre não encontrada' })
  async create(@Body() body: ApartmentDTO): Promise<Apartment> {
    return this.apartmentService.createApartment(body);
  }

  @Get(':id/readings')
  @ApiOperation({ summary: 'Listar todas as leituras de um apartamento' })
  @ApiResponse({
    status: 200,
    description: 'Lista de leituras retornada com sucesso',
    type: [Reading],
  })
  @ApiResponse({
    status: 404,
    description: 'Apartamento ou leituras não encontradas',
  })
  async getReadingsByApartment(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    return this.apartmentService.getReadingsByApartmentId(id);
  }
}
