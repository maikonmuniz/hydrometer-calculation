import {
  Controller,
  Post,
  Body,
  Put,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PersonService } from './person.service';
import { PersonDTO } from '../dto/person.dto';
import { Person } from '../infra/database/entity/person.entity';

@ApiTags('Persons')
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova pessoa vinculada a um apartamento' })
  @ApiResponse({
    status: 201,
    description: 'Pessoa criada com sucesso',
    type: Person,
  })
  @ApiResponse({ status: 404, description: 'Apartamento não encontrado' })
  async create(@Body() body: PersonDTO): Promise<Person> {
    return this.personService.createPerson(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma pessoa pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Pessoa atualizada com sucesso',
    type: Person,
  })
  @ApiResponse({
    status: 404,
    description: 'Pessoa ou apartamento não encontrado',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: PersonDTO,
  ): Promise<Person> {
    return this.personService.updatePerson(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma pessoa pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Pessoa removida com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Pessoa não encontrada' })
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.personService.deletePerson(id);
  }
}
