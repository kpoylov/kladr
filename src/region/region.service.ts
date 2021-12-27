import { Injectable } from '@nestjs/common';
import { SqlConn } from '../data/SqlConn';

@Injectable()
export class RegionService {
    constructor(private readonly dbService: SqlConn) {}

    public async findRegion(contentType, query): Promise<object> {
        let retVal = await this.dbService.getRegionByKladr(query);
        let retObj = {
            result: retVal,
            searchContext: {
                count: retVal.length,
                query: query,
                contentType: contentType
            }
        }
        return retObj;
    }
}