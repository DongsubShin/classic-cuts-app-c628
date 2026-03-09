import { IsUUID, IsDateString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({ example: 'uuid-barber-id' })
  @IsUUID()
  @IsNotEmpty()
  barberId: string;

  @ApiProperty({ example: 'uuid-client-id' })
  @IsUUID()
  @IsNotEmpty()
  clientId: string;

  @ApiProperty({ example: 'uuid-service-id' })
  @IsUUID()
  @IsNotEmpty()
  serviceId: string;

  @ApiProperty({ example: '2023-10-27T10:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  startTime: string;
}