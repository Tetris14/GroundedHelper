import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { biome_entity } from './entity/biomes.entity';
import { ressource_entity } from '../ressources/entity/ressources.entity';
import { BiomesController } from './biomes.controller';
import { BiomesService } from './biomes.service';

@Module({
  imports: [TypeOrmModule.forFeature([biome_entity, ressource_entity])],
  controllers: [BiomesController],
  providers: [BiomesService],
  exports: [BiomesService],
})
export class BiomesModule {}
