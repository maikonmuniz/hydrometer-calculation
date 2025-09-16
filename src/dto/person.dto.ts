import { IsNotEmpty, IsEmail, IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PersonType } from '../infra/database/entity/person.entity';

export class PersonDTO {
  @ApiProperty({ example: 'João Silva', description: 'Nome da pessoa' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Rua Central, 123',
    description: 'Endereço da pessoa',
  })
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 'joao@example.com', description: 'Email da pessoa' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '11999999999', description: 'Telefone da pessoa' })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    enum: PersonType,
    example: PersonType.RESIDENT,
    description: 'Tipo da pessoa',
  })
  @IsEnum(PersonType)
  type: PersonType;

  @ApiProperty({ example: 1, description: 'ID do apartamento vinculado' })
  @IsNumber()
  @IsNotEmpty()
  apartmentId: number;
}
