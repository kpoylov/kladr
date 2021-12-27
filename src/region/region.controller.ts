import { Controller, Post, Body } from '@nestjs/common';
import { RegionService } from './region.service';
import { getRegionDto } from './getRegionDto';

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Post()
  async getRegion(@Body() getRegionDto: getRegionDto) : Promise<object> {
    const contentType = getRegionDto.contentType;
    const query = getRegionDto.query;
    return await this.regionService.findRegion(contentType, query);
  }
  
}
