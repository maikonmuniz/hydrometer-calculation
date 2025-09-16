import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class HydrometerDTO {
  @ApiProperty({ example: 1, description: 'ID do apartamento vinculado' })
  @IsNumber()
  @IsNotEmpty()
  apartmentId: number;
}
