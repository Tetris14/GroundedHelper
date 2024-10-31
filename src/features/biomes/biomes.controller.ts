import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { BiomesService } from './biomes.service';
import { CreateBiomeDto } from './dto/create-biome.dto';

@Controller('biomes')
export class BiomesController {
  constructor(private readonly biomesService: BiomesService) {}

  @Get()
  async getAll() {
    const result = this.biomesService.getAll();
    if (!result) {
      throw new BadRequestException('Couldnt retrieve all biomes');
    }
    return result;
  }

  @Post()
  async create(@Body() createBiomeDto: CreateBiomeDto) {
    const result = this.biomesService.createOne(createBiomeDto);
    if (!result) {
      throw new BadRequestException('couldnt create a new biome');
    }
    return result;
  }
}
