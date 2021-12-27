import { Controller, Post, Body } from '@nestjs/common';
import { BuildingService } from './building.service';
import { getBuildingDto } from './getBuildingDto'

@Controller('building')
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}

  @Post()
  async getRegion(@Body() getBuildingDto: getBuildingDto) : Promise<object> {
    return await this.buildingService.finBuild(getBuildingDto);
  }
}
