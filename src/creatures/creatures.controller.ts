import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { CreaturesService } from './creatures.service';
import { CreateCreatureDto } from './dto/create-creature.dto';

@Controller('creatures')
export class CreaturesController {
  constructor(private readonly creaturesService: CreaturesService) {}

  @Get()
  async getAll() {
    const result = this.creaturesService.getAll();
    if (!result) {
      throw new BadRequestException('Couldnt retrieve all creatures from db');
    }
    return result;
  }

  @Post()
  async createOne(@Body() createCreatureDto: CreateCreatureDto) {
    const result = this.creaturesService.createOne(createCreatureDto);
    if (!result) {
      throw new BadRequestException('Couldnt create a new creature');
    }
    return result;
  }
}
