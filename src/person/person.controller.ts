import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PersonService } from './person.service';
import { PersonDTO } from '../dto/person.dto';
import { Person } from '../infra/database/entity/person.entity';

@ApiTags('Persons') // Agrupa no Swagger
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
}
