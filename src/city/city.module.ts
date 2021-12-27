import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { SqlConn } from '../data/SqlConn';

@Module({
  controllers: [CityController],
  providers: [CityService, SqlConn]
})
export class CityModule {}
