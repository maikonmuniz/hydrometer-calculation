import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ApartmentDTO {
  @ApiProperty({
    example: 1,
    description: 'ID da torre à qual o apartamento pertence',
  })
  @IsNumber()
  @IsNotEmpty()
  towerId: number;
}
