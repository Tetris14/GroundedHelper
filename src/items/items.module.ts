import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { item_entity } from './entity/items.entity';
import { ItemController } from './items.controller';
import { ItemService } from './items.service';
@Module({
  imports: [TypeOrmModule.forFeature([item_entity])],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule {}
