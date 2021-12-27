import { Module } from '@nestjs/common';
import { StreetService } from './street.service';
import { StreetController } from './street.controller';
import { SqlConn } from '../data/SqlConn';

@Module({
  controllers: [StreetController],
  providers: [StreetService, SqlConn]
})
export class StreetModule {}
