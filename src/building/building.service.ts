import { Injectable } from '@nestjs/common';
import { getBuildingDto } from './getBuildingDto'
import { SqlConn } from '../data/SqlConn';

@Injectable()
export class BuildingService {
    constructor(private readonly dbService: SqlConn) {}

    public async finBuild(getBuildingDto: getBuildingDto) : Promise<object> {
        let retVal = await this.dbService.getBuildByKladr(getBuildingDto.query, getBuildingDto.streetId);

        return retVal;
    }
}
