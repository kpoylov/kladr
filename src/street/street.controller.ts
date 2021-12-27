import { Controller, Post, Body } from '@nestjs/common';
import { StreetService } from './street.service';
import { getStreetDto } from './getStreetDto'

@Controller('street')
export class StreetController {
  constructor(private readonly streetService: StreetService) {}

  @Post()
  async getRegion(@Body() getStreetDto: getStreetDto) : Promise<object> {
    return await this.streetService.findStreet(getStreetDto);
  }
}
