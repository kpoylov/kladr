import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class getBuildingDto {
    @IsString()
    @ApiProperty()
    contentType: string;

    @IsString()
    @ApiProperty()
    query: string;

    @IsString()
    @ApiProperty()
    streetId: string;
  }