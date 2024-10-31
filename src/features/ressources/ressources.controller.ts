import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { RessourceService } from './ressources.service';
import { CreateRessourceDto } from './dto/create-ressource.dto';

@Controller('ressources')
export class RessourceController {
  constructor(private readonly ressourceService: RessourceService) {}

  @Get()
  async getAll() {
    const result = this.ressourceService.getAll();
    if (!result) {
      throw new BadRequestException('couldnt retrieve all ressource');
    }
    return result;
  }

  @Post()
  async createOne(@Body() createRessourceDto: CreateRessourceDto) {
    const result = this.ressourceService.createOne(createRessourceDto);
    if (!result) {
      throw new BadRequestException('couldnt create a new ressource');
    }
    return result;
  }
}
