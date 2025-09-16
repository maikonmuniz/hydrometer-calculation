import { IsNotEmpty, IsNumber, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ReadingPeriodicity } from '../infra/database/entity/reading.entity';

export class ReadingDTO {
  @ApiProperty({ example: 1, description: 'ID do hidrômetro vinculado' })
  @IsNumber()
  @IsNotEmpty()
  hydrometerId: number;

  @ApiProperty({ example: '2025-09-16', description: 'Data da leitura' })
  @IsDateString()
  @IsNotEmpty()
  readingDate: string;

  @ApiProperty({ example: 12.34, description: 'Valor de consumo em m³' })
  @IsNumber()
  @IsNotEmpty()
  consumption: number;

  @ApiProperty({
    enum: ReadingPeriodicity,
    example: ReadingPeriodicity.MONTHLY,
    description: 'Periodicidade da leitura',
  })
  @IsEnum(ReadingPeriodicity)
  @IsNotEmpty()
  periodicity: ReadingPeriodicity;
}
