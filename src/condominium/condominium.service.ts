import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
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

  async gasConsumptionByCondominium(
    id: number,
    dateStart: string,
    dataEnd: string,
  ) {
    return this.condominiumRepository.dateFilterByCondominium(
      id,
      dateStart,
      dataEnd,
    );
  }

  async update(id: number, body: CondominiumDTO): Promise<Condominium> {
    const condominium = await this.condominiumRepository.findOne({
      where: { id },
    });

    if (!condominium) {
      throw new NotFoundException(`Condomínio com id ${id} não encontrado.`);
    }

    Object.assign(condominium, body);

    return this.condominiumRepository.save(condominium);
  }

  async delete(id: number): Promise<{ message: string }> {
    const condominium = await this.condominiumRepository.findOne({
      where: { id },
    });

    if (!condominium) {
      throw new NotFoundException(`Condomínio com id ${id} não encontrado.`);
    }

    await this.condominiumRepository.remove(condominium);

    return { message: `Condomínio com id ${id} removido com sucesso.` };
  }
}
