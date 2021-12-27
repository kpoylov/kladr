import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class getDistrictDto {
    @IsString()
    @ApiProperty()
    contentType: string;

    @IsString()
    @ApiProperty()
    query: string;

    @IsString()
    @ApiProperty()
    parentType: string;

    @IsString()
    @ApiProperty()
    parentId: string;

    @IsString()
    @ApiProperty()
    regionId: string;
  }