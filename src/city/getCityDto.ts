import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class getCityDto {
    @IsString()
    @ApiProperty()
    districtId: string;

    @IsString()
    @ApiProperty()
    contentType: string;

    @IsString()
    @ApiProperty()
    parentType: string;

    @IsString()
    @ApiProperty()
    parentId: string;

    @IsString()
    @ApiProperty()
    query: string;
  }