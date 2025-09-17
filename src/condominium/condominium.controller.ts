import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CondominiumService } from './condominium.service';
import { CondominiumDTO } from '../dto/condominium.dto';

@ApiTags('Condominiums')
@Controller('condominium')
export class CondominiumController {
  constructor(private readonly service: CondominiumService) {}

  @Post('create')
  @ApiOperation({ summary: 'Registrar condomínio' })
  @ApiResponse({
    status: 201,
    description: 'Condomínio criado com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Campos obrigatórios faltando ou condomínio já registrado.',
  })
  create(@Body() body: CondominiumDTO) {
    return this.service.register(body);
  }

  @Get(':id/readings')
  @ApiOperation({
    summary: 'Listar leituras de hidrômetros pelo ID do condomínio',
  })
  @ApiResponse({
    status: 200,
    description: 'Leituras encontradas com sucesso',
    type: [Object],
  })
  @ApiResponse({
    status: 404,
    description: 'Condomínio ou leituras não encontradas',
  })
  getReadings(@Param('id', ParseIntPipe) id: number) {
    return this.service.getReadingsByCondominiumId(id);
  }

  @Get(':id/gas-consumption')
  @ApiOperation({
    summary:
      'Consultar consumo de gás de um condomínio em um intervalo de datas',
  })
  @ApiResponse({
    status: 200,
    description: 'Consumo de gás retornado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Condomínio não encontrado',
  })
  getGasConsumptionByCondominium(
    @Param('id', ParseIntPipe) id: number,
    @Query('dateStart') dateStart: string,
    @Query('dateEnd') dateEnd: string,
  ) {
    return this.service.gasConsumptionByCondominium(id, dateStart, dateEnd);
  }
}
