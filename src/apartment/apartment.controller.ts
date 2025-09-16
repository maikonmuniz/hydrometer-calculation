import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApartmentService } from './apartment.service';
import { ApartmentDTO } from '../dto/apartment.dto';
import { Apartment } from '../infra/database/entity/apartment.entity';

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
}
