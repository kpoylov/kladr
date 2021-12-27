import { Injectable } from '@nestjs/common';
import { SqlConn } from '../data/SqlConn';
import { getCityDto } from './getCityDto';

@Injectable()
export class CityService {
    constructor(private readonly dbService: SqlConn) {}

    public async findCity(getCityDto: getCityDto) : Promise<object> {
        let retVal = await this.dbService.getCityByKladr(getCityDto.query, getCityDto.districtId, getCityDto.parentId);
        let retObj = {
            result: retVal,
            searchContext: {
                count: retVal.length,
                query: getCityDto.query,
                contentType: getCityDto.contentType
            }
        }
        return retObj;
    }
}
