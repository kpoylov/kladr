import { Controller, Post, Body } from '@nestjs/common';
import { CityService } from './city.service';
import { getCityDto } from './getCityDto';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  async getCity(@Body() getCityDto: getCityDto) : Promise<object> {
   return await this.cityService.findCity(getCityDto);
  }
}