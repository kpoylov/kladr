import { Injectable } from '@nestjs/common';
import { getStreetDto } from './getStreetDto'
import { SqlConn } from '../data/SqlConn';

@Injectable()
export class StreetService {
    constructor(private readonly dbService: SqlConn) {}

    public async findStreet(getStreetDto: getStreetDto) : Promise<object> {
        let retVal = await this.dbService.getStreetByKladr(getStreetDto.query, getStreetDto.cityId);

        return retVal;
    }
}
