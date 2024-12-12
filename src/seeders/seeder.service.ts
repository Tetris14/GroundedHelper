import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { item_entity } from 'src/items/entity/items.entity';
import { Repository } from 'typeorm';
import { creature_entity } from '../creatures/entity/creatures.entity';
import { biome_entity } from '../biomes/entity/biomes.entity';
import { readJsonFile } from 'src/utils/readJson';
import * as path from 'path';
import { CreateBiomeDto } from '../biomes/dto/create-biome.dto';
import { BiomesService } from '../biomes/biomes.service';
import { CreaturesService } from '../creatures/creatures.service';
import { CreateCreatureDto } from '../creatures/dto/create-creature.dto';

/**
 * Returns the full path of a file relative to the current directory.
 *
 * @param filePath - The relative path of the file to resolve.
 * @returns The full path of the file.
 */
export function getFilePath(filePath: string): string {
  return path.join(__dirname, filePath);
}

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(item_entity)
    private readonly itemRepository: Repository<item_entity>,
    @InjectRepository(creature_entity)
    private readonly creatureRepository: Repository<creature_entity>,
    private readonly creatureService: CreaturesService,
    @InjectRepository(biome_entity)
    private readonly biomeRepository: Repository<biome_entity>,
    private readonly biomeService: BiomesService,
  ) {}

  async seedItems() {
    const itemsJsonPath: string = getFilePath('/data/items.json');
    const jsonData = (await readJsonFile(itemsJsonPath)) as unknown;

    if (
      typeof jsonData === 'object' &&
      jsonData !== null &&
      'resources' in jsonData &&
      Array.isArray((jsonData as any).resources)
    ) {
      const itemsData = jsonData as { resources: string[] };
      const items = itemsData.resources.map((res) =>
        this.itemRepository.create({ name: res }),
      );

      await this.itemRepository.save(items);
    } else {
      throw new Error("Invalid data format: 'resources' array is missing.");
    }
  }

  async seedBiomes() {
    const biomesJsonPath: string = getFilePath('/data/biomes.json');
    const jsonData = (await readJsonFile(biomesJsonPath)) as unknown;

    if (
      typeof jsonData === 'object' &&
      jsonData !== null &&
      'biomes' in jsonData &&
      Array.isArray((jsonData as any).biomes)
    ) {
      const biomesData = (jsonData as { biomes: any[] }).biomes;

      for (let index = 0; index < biomesData.length; index++) {
        const element = biomesData[index];
        const biomeDto: CreateBiomeDto = {
          name: element.name,
          categories: element.categories,
          unique_items: element.unique_items,
        };
        const newBiome = await this.biomeService.createOne(biomeDto);
        this.biomeRepository.save(newBiome);
      }
    } else {
      throw new Error("Invalid data format: 'biomes' array is missing.");
    }
  }

  async seedCreatures() {
    const biomesJsonPath: string = getFilePath('/data/creatures.json');
    const jsonData = (await readJsonFile(biomesJsonPath)) as unknown;

    if (
      typeof jsonData === 'object' &&
      jsonData !== null &&
      'creatures' in jsonData &&
      Array.isArray((jsonData as any).creatures)
    ) {
      const creaturesData = (jsonData as { creatures: any[] }).creatures;

      for (let index = 0; index < creaturesData.length; index++) {
        const element = creaturesData[index];
        const creatureDto: CreateCreatureDto = {
          name: element.name,
          type: element.type,
          health: element.health,
          item: element.items,
          biomes: element.biomes,
        };
        const newCrea = await this.creatureService.createOne(creatureDto);
        this.creatureRepository.save(newCrea);
      }
    } else {
      throw new Error("Invalid data format: 'creatures' array is missing.");
    }
  }
}
