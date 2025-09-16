import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CondominiumService } from './condominium.service';
import { CondominiumDTO } from '../dto/condominium.dto';

@Controller('condominium')
export class CondominiumController {
  constructor(private readonly service: CondominiumService) {}

  @Post('create')
  @ApiOperation({ summary: 'Registrar condomínio' })
  @ApiResponse({
    status: 200,
    description: 'Retorna o condomínio com sucesso.',
  })
  create(@Body() body: CondominiumDTO) {
    return this.service.register(body);
  }
}
