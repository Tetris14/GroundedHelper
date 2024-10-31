import { creatureRessource_entity } from 'src/features/creature-loot/entity/creature-loot.entity';
import { biome_entity } from 'src/features/biomes/entity/biomes.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ressource_entity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  image: string;

  @OneToMany(
    () => creatureRessource_entity,
    (creatureRessource) => creatureRessource.ressource,
  )
  creatureRessources: creatureRessource_entity[];

  @ManyToMany(() => biome_entity, (biome) => biome.unique_ressources)
  biomes: biome_entity[];
}
