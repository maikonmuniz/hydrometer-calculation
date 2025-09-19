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

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um hidrômetro pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Hidrômetro atualizado com sucesso',
    type: Hydrometer,
  })
  @ApiResponse({
    status: 404,
    description: 'Hidrômetro ou apartamento não encontrado',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: HydrometerDTO,
  ): Promise<Hydrometer> {
    return this.hydrometerService.updateHydrometer(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um hidrômetro pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Hidrômetro removido com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Hidrômetro não encontrado' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.hydrometerService.deleteHydrometer(id);
  }
}
