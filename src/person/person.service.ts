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

  async updatePerson(id: number, body: PersonDTO): Promise<Person> {
    const person = await this.personRepository.findOne({
      where: { id },
      relations: ['apartment'],
    });

    if (!person) {
      throw new NotFoundException(`Pessoa com id ${id} não encontrada`);
    }

    if (body.apartmentId) {
      const apartment = await this.apartmentRepository.findOne({
        where: { id: body.apartmentId },
      });

      if (!apartment) {
        throw new NotFoundException('Apartamento não encontrado');
      }

      person.apartment = apartment;
    }

    Object.assign(person, {
      name: body.name ?? person.name,
      address: body.address ?? person.address,
      email: body.email ?? person.email,
      phone: body.phone ?? person.phone,
      type: body.type ?? person.type,
    });

    return this.personRepository.save(person);
  }

  async deletePerson(id: number): Promise<{ message: string }> {
    const person = await this.personRepository.findOne({
      where: { id },
    });

    if (!person) {
      throw new NotFoundException(`Pessoa com id ${id} não encontrada`);
    }

    await this.personRepository.remove(person);

    return { message: `Pessoa com id ${id} removida com sucesso` };
  }
}
