import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CondominiumDTO } from '../dto/condominium.dto';
import { Condominium } from '../infra/database/entity/condominium.entity';
import { CondominiumRepository } from '../infra/database/repository/condominium.repository';

@Injectable()
export class CondominiumService {
  constructor(private readonly condominiumRepository: CondominiumRepository) {}

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
    return this.condominiumRepository.save(condominium);
  }

  async getReadingsByCondominiumId(condominiumId: number): Promise<any[]> {
    return this.condominiumRepository.getReadingsByCondominiumId(condominiumId);
  }
}
