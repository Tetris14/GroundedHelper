import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { biome_entity } from './entity/biomes.entity';
import { Repository } from 'typeorm';
import { CreateBiomeDto } from './dto/create-biome.dto';
import { ressource_entity } from '../ressources/entity/ressources.entity';

@Injectable()
export class BiomesService {
  constructor(
    @InjectRepository(biome_entity)
    private readonly biomeRepository: Repository<biome_entity>,
    @InjectRepository(ressource_entity)
    private readonly ressourceRepository: Repository<ressource_entity>,
  ) {}

  async getAll() {
    const allBiome = await this.biomeRepository.find();
    if (!allBiome) {
      throw new BadRequestException('Couldnt retrieve all biomes');
    }
    return allBiome;
  }

  async createOne(createBiomeDto: CreateBiomeDto) {
    const newBiome: biome_entity = new biome_entity();
    newBiome.name = createBiomeDto.name;
    newBiome.categories = [];
    newBiome.creatures = [];
    newBiome.unique_ressources = [];
    createBiomeDto.categories.map((category) =>
      newBiome.categories.push(category),
    );
    for (
      let index = 0;
      index < createBiomeDto.unique_ressources.length;
      index++
    ) {
      const element = createBiomeDto.unique_ressources[index];
      const res = await this.ressourceRepository.findOne({
        where: { name: element },
      });
      if (res) {
        newBiome.unique_ressources.push(res);
      } else {
        throw new NotFoundException(
          `couldnt find an item with this name : ${res.name}`,
        );
      }
    }
    await this.biomeRepository.save(newBiome);
    return newBiome;
  }
}
