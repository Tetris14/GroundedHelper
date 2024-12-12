import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { biome_entity } from './entity/biomes.entity';
import { item_entity } from 'src/items/entity/items.entity';
import { BiomesController } from './biomes.controller';
import { BiomesService } from './biomes.service';

@Module({
  imports: [TypeOrmModule.forFeature([biome_entity, item_entity])],
  controllers: [BiomesController],
  providers: [BiomesService],
  exports: [BiomesService],
})
export class BiomesModule {}
