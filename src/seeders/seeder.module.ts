import { Module } from '@nestjs/common';
import { SeedService } from './seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { biome_entity } from '../biomes/entity/biomes.entity';
import { creature_entity } from '../creatures/entity/creatures.entity';
import { item_entity } from 'src/items/entity/items.entity';
import { BiomesService } from '../biomes/biomes.service';
import { CreaturesService } from '../creatures/creatures.service';
import { creatureItem_entity } from '../creature-loot/entity/creature-loot.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      biome_entity,
      creature_entity,
      item_entity,
      creatureItem_entity,
    ]),
  ],
  providers: [SeedService, BiomesService, CreaturesService],
  exports: [SeedService],
})
export class SeedModule {}
