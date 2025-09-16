import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HydrometerService } from './hydrometer.service';
import { HydrometerDTO } from '../dto/hydrometer.dto';
import { Hydrometer } from '../infra/database/entity/hydrometer.entity';

@ApiTags('Hydrometers')
@Controller('hydrometer')
export class HydrometerController {
  constructor(private readonly hydrometerService: HydrometerService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um novo hidrômetro vinculado a um apartamento',
  })
  @ApiResponse({
    status: 201,
    description: 'Hidrômetro criado com sucesso',
    type: Hydrometer,
  })
  @ApiResponse({ status: 404, description: 'Apartamento não encontrado' })
  async create(@Body() body: HydrometerDTO): Promise<Hydrometer> {
    return this.hydrometerService.createHydrometer(body);
  }
}
