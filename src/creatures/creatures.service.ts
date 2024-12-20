import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { creature_entity } from './entity/creatures.entity';
import { In, Repository } from 'typeorm';
import { CreateCreatureDto } from './dto/create-creature.dto';
import { biome_entity } from '../biomes/entity/biomes.entity';
import { creatureItem_entity } from '../creature-loot/entity/creature-loot.entity';
import { item_entity } from 'src/items/entity/items.entity';

@Injectable()
export class CreaturesService {
  constructor(
    @InjectRepository(creature_entity)
    private readonly creaturesRepository: Repository<creature_entity>,
    @InjectRepository(biome_entity)
    private readonly biomesRepository: Repository<biome_entity>,
    @InjectRepository(creatureItem_entity)
    private readonly creatureItemRepository: Repository<creatureItem_entity>,
    @InjectRepository(item_entity)
    private readonly itemRepository: Repository<item_entity>,
  ) {}

  async getAll() {
    const allCreatures = this.creaturesRepository.find();
    if (!allCreatures) {
      throw new BadRequestException('Couldnt find all creatures');
    }
    return allCreatures;
  }

  async createOne(createCreatureDto: CreateCreatureDto) {
    const newCreature: creature_entity = new creature_entity();
    newCreature.name = createCreatureDto.name;
    newCreature.type = createCreatureDto.type;
    newCreature.health = createCreatureDto.health;
    newCreature.biomes = [];
    newCreature.creatureItem = [];
    const biomesInput = Array.isArray(createCreatureDto.biomes)
      ? createCreatureDto.biomes
      : [createCreatureDto.biomes];
    const biomes = await this.biomesRepository.find({
      where: { name: In(biomesInput) },
    });
    biomes.map((item) => newCreature.biomes.push(item));
    for (let index = 0; index < createCreatureDto.item.length; index++) {
      const element = createCreatureDto.item[index];
      const itemInDb = await this.itemRepository.findOne({
        where: { name: element.name },
      });
      if (itemInDb) {
        this.creatureItemRepository.create({
          dropQuantity: element.quantity,
          creature: newCreature,
          item: itemInDb,
        });
      } else {
        throw new NotFoundException(
          `Couldnt find a item with this name : ${element.name}`,
        );
      }
    }
    for (let index = 0; index < biomesInput.length; index++) {
      const element = biomesInput[index];
      const biomeInDb = await this.biomesRepository.findOne({
        where: { name: element },
      });
      if (biomeInDb) {
        newCreature.biomes.push(biomeInDb);
      } else {
        throw new NotFoundException(
          `Couldnt find an biome with this name : ${element}`,
        );
      }
    }
    this.creaturesRepository.save(newCreature);
    return newCreature;
  }
}
