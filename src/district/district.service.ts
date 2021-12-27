import { Injectable } from '@nestjs/common';
import { SqlConn } from '../data/SqlConn';
import { getDistrictDto } from './getDistrictDto';

@Injectable()
export class DistrictService {
    constructor(private readonly dbService: SqlConn) {}

    public async findDistrict(getDistrictDto: getDistrictDto) : Promise<object> {
        let retVal = await this.dbService.getDistrictByKladr(getDistrictDto.query, getDistrictDto.regionId);
        let retObj = {
            result: retVal,
            searchContext: {
                count: retVal.length,
                query: getDistrictDto.query,
                contentType: getDistrictDto.contentType
            }
        }
        return retObj;
    }

}
