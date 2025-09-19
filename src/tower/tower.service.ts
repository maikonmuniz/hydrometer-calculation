import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TowerDTO } from 'src/dto/tower.dto';
import { Condominium } from 'src/infra/database/entity/condominium.entity';
import { Tower } from 'src/infra/database/entity/tower.entity';
import { TowerRepository } from 'src/infra/database/repository/tower.repository';
import { Repository } from 'typeorm';

@Injectable()
export class TowerService {
  constructor(
    private readonly towerRepository: TowerRepository,
    @InjectRepository(Condominium)
    private readonly condominiumRepository: Repository<Condominium>,
  ) {}

  async createTower(body: TowerDTO): Promise<Tower> {
    const condominium = await this.condominiumRepository.findOne({
      where: { id: body.condominiumId },
    });

    if (!condominium) {
      throw new BadRequestException('Condomínio não encontrado');
    }

    const tower = this.towerRepository.create({
      ...body,
      condominium,
    });
    return this.towerRepository.save(tower);
  }

  async getReadingsByTowerId(towerId: number): Promise<any[]> {
    return this.towerRepository.getReadingsByTowerId(towerId);
  }

  async gasConsumptionByTower(id: number, dateStart: string, dataEnd: string) {
    return this.towerRepository.dateFilterByTower(id, dateStart, dataEnd);
  }

  async updateTower(id: number, body: TowerDTO): Promise<Tower> {
    const tower = await this.towerRepository.findOne({
      where: { id },
      relations: ['condominium'],
    });

    if (!tower) {
      throw new NotFoundException(`Torre com id ${id} não encontrada`);
    }

    if (body.condominiumId) {
      const condominium = await this.condominiumRepository.findOne({
        where: { id: body.condominiumId },
      });

      if (!condominium) {
        throw new NotFoundException('Condomínio não encontrado');
      }

      tower.condominium = condominium;
    }

    Object.assign(tower, body);

    return this.towerRepository.save(tower);
  }

  async deleteTower(id: number): Promise<{ message: string }> {
    const tower = await this.towerRepository.findOne({
      where: { id },
    });

    if (!tower) {
      throw new NotFoundException(`Torre com id ${id} não encontrada`);
    }

    await this.towerRepository.remove(tower);

    return { message: `Torre com id ${id} removida com sucesso` };
  }
}
