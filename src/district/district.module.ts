import { Module } from '@nestjs/common';
import { DistrictService } from './district.service';
import { DistrictController } from './district.controller';
import { SqlConn } from '../data/SqlConn';

@Module({
  controllers: [DistrictController],
  providers: [DistrictService, SqlConn]
})
export class DistrictModule {}

