interface itemTable {
  quantity: number;
  name: string;
}

export class CreateCreatureDto {
  name: string;
  type: string;
  health: number;
  item: itemTable[];
  biomes: string[];
}
