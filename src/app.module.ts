import { Module } from '@nestjs/common';

import { RegionController} from './region/region.controller';
import { RegionService } from './region/region.service';

import { SqlConn } from './data/SqlConn'

import { DistrictModule } from './district/district.module';
import { DistrictController } from './district/district.controller';
import { DistrictService } from './district/district.service';

import { CityModule } from './city/city.module';
import { CityController } from './city/city.controller';
import { CityService } from './city/city.service';


import { StreetModule } from './street/street.module';
import { StreetController } from './street/street.controller';
import { StreetService } from './street/street.service';

import { BuildingModule } from './building/building.module';
import { BuildingController } from './building/building.controller';
import { BuildingService } from './building/building.service';

@Module({
  imports: [DistrictModule, CityModule, StreetModule, BuildingModule],
  controllers: [RegionController, DistrictController, CityController, StreetController, BuildingController],
  providers: [RegionService, DistrictService, CityService, StreetService, BuildingService, SqlConn],
})
export class AppModule {}
