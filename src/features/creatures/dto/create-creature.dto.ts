interface ressourceTable {
  quantity: number;
  name: string;
}

export class CreateCreatureDto {
  name: string;
  type: string;
  health: number;
  ressource: ressourceTable[];
  biomes: string[];
}
