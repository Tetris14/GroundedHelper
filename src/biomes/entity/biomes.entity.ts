import { creature_entity } from 'src/creatures/entity/creatures.entity';
import { item_entity } from 'src/items/entity/items.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class biome_entity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  image: string;

  @Column('text', { array: true, default: [] })
  categories: string[];

  @ManyToMany(() => creature_entity, (creature) => creature.biomes)
  @JoinTable()
  creatures: creature_entity[];

  @ManyToMany(() => item_entity, (item) => item.biomes)
  @JoinTable()
  unique_items: item_entity[];
}
