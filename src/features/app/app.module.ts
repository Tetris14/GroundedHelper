// src/features/app/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { creatureRessource_entity } from '../creature-loot/entity/creature-loot.entity';
import { creature_entity } from '../creatures/entity/creatures.entity';
import { biome_entity } from '../biomes/entity/biomes.entity';
import { ressource_entity } from '../ressources/entity/ressources.entity';
import { CreaturesModule } from '../creatures/creatures.module';
import { BiomesModule } from '../biomes/biomes.module';
import { RessourceModule } from '../ressources/ressources.module';
import { SeedModule } from '../seeders/seeder.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // Replace with your database host
      port: 5432, // Replace with your database port
      username: 'tristanus', // Replace with your database username
      password: '', // Replace with your database password
      database: 'groundedb', // Replace with your database name
      entities: [
        creatureRessource_entity,
        creature_entity,
        biome_entity,
        ressource_entity,
      ],
      synchronize: true, // Set to false in production
    }),
    CreaturesModule,
    BiomesModule,
    RessourceModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
