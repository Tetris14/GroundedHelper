// src/features/creatures/creatures.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreaturesService } from './creatures.service';
import { CreaturesController } from './creatures.controller';
import { creature_entity } from './entity/creatures.entity';
import { biome_entity } from '../biomes/entity/biomes.entity';
import { creatureRessource_entity } from '../creature-loot/entity/creature-loot.entity';
import { ressource_entity } from '../ressources/entity/ressources.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      creature_entity,
      biome_entity,
      creatureRessource_entity,
      ressource_entity,
    ]),
  ],
  controllers: [CreaturesController],
  providers: [CreaturesService],
  exports: [CreaturesService],
})
export class CreaturesModule {}
