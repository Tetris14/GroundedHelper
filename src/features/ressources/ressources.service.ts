import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ressource_entity } from './entity/ressources.entity';
import { Repository } from 'typeorm';
import { CreateRessourceDto } from './dto/create-ressource.dto';

@Injectable()
export class RessourceService {
  constructor(
    @InjectRepository(ressource_entity)
    private readonly ressourceRepository: Repository<ressource_entity>,
  ) {}

  async getAll() {
    const allRessource = await this.ressourceRepository.find();
    if (!allRessource) {
      throw new BadRequestException('couldnt retrieve all ressource');
    }
    return allRessource;
  }

  async createOne(createRessourceDto: CreateRessourceDto) {
    const newRessource: ressource_entity = new ressource_entity();
    newRessource.name = createRessourceDto.name;
    this.ressourceRepository.save(newRessource);
    return newRessource;
  }
}
