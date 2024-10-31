// creature-ressource.entity.ts

import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { creature_entity } from 'src/features/creatures/entity/creatures.entity';
import { ressource_entity } from 'src/features/ressources/entity/ressources.entity';

@Entity()
export class creatureRessource_entity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  dropQuantity: number;

  @ManyToOne(() => creature_entity, (creature) => creature.creatureRessource)
  creature: creature_entity;

  @ManyToOne(
    () => ressource_entity,
    (ressource) => ressource.creatureRessources,
  )
  ressource: ressource_entity;
}
