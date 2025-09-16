import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CondominiumDTO } from '../dto/condominium.dto';
import { Condominium } from '../infra/database/entity/condominium.entity';

@Injectable()
export class CondominiumService {
  constructor(
    @InjectRepository(Condominium)
    private condominiumRepository: Repository<Condominium>,
  ) {}

  private ensureRequiredFields(
    body: CondominiumDTO,
    requiredFields: (keyof CondominiumDTO)[],
  ) {
    const missing = requiredFields.filter((field) => !body[field]);
    if (missing.length > 0) {
      throw new BadRequestException(
        `Campos obrigatórios faltando: ${missing.join(', ')}`,
      );
    }
  }

  async register(body: CondominiumDTO): Promise<Condominium> {
    this.ensureRequiredFields(body, [
      'name',
      'andress',
      'neighborhood',
      'num',
      'postalCode',
      'state',
      'street',
      'uf',
    ]);

    const exists = await this.condominiumRepository.findOne({
      where: { name: body.name },
    });

    if (exists) {
      throw new BadRequestException('Condomínio já registrado.');
    }

    const condominium = this.condominiumRepository.create(body);
    return await this.condominiumRepository.save(condominium);
  }
}
