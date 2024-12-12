import { creatureItem_entity } from 'src/creature-loot/entity/creature-loot.entity';
import { biome_entity } from 'src/biomes/entity/biomes.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class creature_entity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  card_image: string;

  @Column()
  type: string;

  @Column()
  health: number;

  @Column({ nullable: true })
  StunTreshold: number;

  @ManyToMany(() => biome_entity, (biome) => biome.creatures)
  @JoinTable()
  biomes: biome_entity[];

  @ManyToMany(
    () => creatureItem_entity,
    (creatureItem) => creatureItem.creature,
  )
  @JoinTable()
  creatureItem: creatureItem_entity[];
}
