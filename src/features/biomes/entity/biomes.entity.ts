import { creature_entity } from 'src/features/creatures/entity/creatures.entity';
import { ressource_entity } from 'src/features/ressources/entity/ressources.entity';
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

  @ManyToMany(() => ressource_entity, (ressource) => ressource.biomes)
  @JoinTable()
  unique_ressources: ressource_entity[];
}
