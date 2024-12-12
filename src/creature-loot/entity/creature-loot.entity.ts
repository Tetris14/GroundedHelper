// creature-item.entity.ts

import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { creature_entity } from 'src/creatures/entity/creatures.entity';
import { item_entity } from 'src/items/entity/items.entity';

@Entity()
export class creatureItem_entity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  dropQuantity: number;

  @ManyToOne(() => creature_entity, (creature) => creature.creatureItem)
  creature: creature_entity;

  @ManyToOne(() => item_entity, (item) => item.creatureItems)
  item: item_entity;
}
