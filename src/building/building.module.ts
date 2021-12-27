import { Module } from '@nestjs/common';
import { BuildingService } from './building.service';
import { BuildingController } from './building.controller';
import { SqlConn } from '../data/SqlConn';

@Module({
  controllers: [BuildingController],
  providers: [BuildingService, SqlConn]
})
export class BuildingModule {}
