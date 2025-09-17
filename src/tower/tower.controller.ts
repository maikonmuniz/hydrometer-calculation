import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TowerService } from './tower.service';
import { TowerDTO } from '../dto/tower.dto';
import { Tower } from '../infra/database/entity/tower.entity';

@ApiTags('Towers')
@Controller('tower')
export class TowerController {
  constructor(private readonly towerService: TowerService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova torre vinculada a um condomínio' })
  @ApiResponse({
    status: 201,
    description: 'Torre criada com sucesso',
    type: Tower,
  })
  @ApiResponse({ status: 404, description: 'Condomínio não encontrado' })
  async create(@Body() body: TowerDTO): Promise<Tower> {
    return this.towerService.createTower(body);
  }

  @Get(':id/readings')
  @ApiOperation({
    summary: 'Listar leituras de um hidrômetro pelo ID da torre',
  })
  @ApiResponse({
    status: 200,
    description: 'Leituras encontradas com sucesso',
    type: [Object],
  })
  @ApiResponse({ status: 404, description: 'Torre não encontrada' })
  async getReadingsByTowerId(@Param('id', ParseIntPipe) id: number) {
    return this.towerService.getReadingsByTowerId(id);
  }
}
