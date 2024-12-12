import { creatureItem_entity } from 'src/creature-loot/entity/creature-loot.entity';
import { biome_entity } from 'src/biomes/entity/biomes.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class item_entity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => creatureItem_entity, (creatureItem) => creatureItem.item)
  creatureItems: creatureItem_entity[];

  @ManyToMany(() => biome_entity, (biome) => biome.unique_items)
  biomes: biome_entity[];
}
