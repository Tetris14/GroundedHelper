// src/creatures/creatures.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreaturesService } from './creatures.service';
import { CreaturesController } from './creatures.controller';
import { creature_entity } from './entity/creatures.entity';
import { biome_entity } from '../biomes/entity/biomes.entity';
import { creatureItem_entity } from '../creature-loot/entity/creature-loot.entity';
import { item_entity } from 'src/items/entity/items.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      creature_entity,
      biome_entity,
      creatureItem_entity,
      item_entity,
    ]),
  ],
  controllers: [CreaturesController],
  providers: [CreaturesService],
  exports: [CreaturesService],
})
export class CreaturesModule {}
