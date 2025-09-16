import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TowerDTO } from 'src/dto/tower.dto';
import { Condominium } from 'src/infra/database/entity/condominium.entity';
import { Tower } from 'src/infra/database/entity/tower.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TowerService {
  constructor(
    @InjectRepository(Tower)
    private towerRepository: Repository<Tower>,
    @InjectRepository(Condominium)
    private condominiumRepository: Repository<Condominium>,
  ) {}

  async createTower(body: TowerDTO): Promise<Tower> {
    const condominium = await this.condominiumRepository.findOne({
      where: { id: body.condominiumId },
    });

    if (!condominium) {
      throw new BadRequestException('Condomínio não encontrado');
    }

    const tower = this.towerRepository.create({
      condominium,
    });

    return await this.towerRepository.save(tower);
  }
}
