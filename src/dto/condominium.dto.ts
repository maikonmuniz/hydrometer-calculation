import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class CondominiumDTO {
  @ApiProperty({ description: 'ID do condomínio', example: 1 })
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty({
    description: 'Nome do condomínio',
    example: 'Sunset Condominium',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Endereço completo',
    example: 'Rua das Flores, 123',
  })
  @IsString()
  andress: string;

  @ApiProperty({ description: 'CEP do condomínio', example: '12345-678' })
  @IsString()
  postalCode: string;

  @ApiProperty({
    description: 'Logradouro (rua/avenida)',
    example: 'Rua das Flores',
  })
  @IsString()
  street: string;

  @ApiProperty({ description: 'Número do imóvel', example: 123 })
  @IsNumber()
  num: number;

  @ApiProperty({ description: 'Bairro', example: 'Jardim das Flores' })
  @IsString()
  neighborhood: string;

  @ApiProperty({ description: 'Estado', example: 'São Paulo' })
  @IsString()
  state: string;

  @ApiProperty({ description: 'UF', example: 'SP' })
  @IsString()
  uf: string;
}
