import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class getStreetDto {
    @IsString()
    @ApiProperty()
    contentType: string;

    @IsString()
    @ApiProperty()
    query: string;

    @IsString()
    @ApiProperty()
    cityId: string;
  }