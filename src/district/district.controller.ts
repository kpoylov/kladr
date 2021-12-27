import { Controller, Post, Body } from '@nestjs/common';
import { DistrictService } from './district.service';
import { getDistrictDto } from './getDistrictDto';

@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Post()
  async getRegion(@Body() getDistrictDto: getDistrictDto) : Promise<object> {
    return await this.districtService.findDistrict(getDistrictDto);
  }
}
