import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../infra/database/entity/person.entity';
import { Apartment } from '../infra/database/entity/apartment.entity';
import { PersonDTO } from '../dto/person.dto';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,

    @InjectRepository(Apartment)
    private apartmentRepository: Repository<Apartment>,
  ) {}

  async createPerson(body: PersonDTO): Promise<Person> {
    const apartment = await this.apartmentRepository.findOne({
      where: { id: body.apartmentId },
    });

    if (!apartment) {
      throw new NotFoundException('Apartamento não encontrado');
    }

    const person = this.personRepository.create({
      name: body.name,
      address: body.address,
      email: body.email,
      phone: body.phone,
      type: body.type,
      apartment,
    });

    return await this.personRepository.save(person);
  }
}
