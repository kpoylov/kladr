import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class getRegionDto {
    @IsString()
    @ApiProperty()
    contentType: string;

    @IsString()
    @ApiProperty()
    query: string;
  }