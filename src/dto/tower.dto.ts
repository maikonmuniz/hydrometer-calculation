import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class TowerDTO {
  @ApiProperty({
    description: 'ID do condomínio ao qual a torre pertence',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  condominiumId?: number;
}
