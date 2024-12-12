import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { item_entity } from './entity/items.entity';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(item_entity)
    private readonly itemRepository: Repository<item_entity>,
  ) {}

  async getAll() {
    const allItem = await this.itemRepository.find();
    if (!allItem) {
      throw new BadRequestException('couldnt retrieve all item');
    }
    return allItem;
  }

  async createOne(createItemDto: CreateItemDto) {
    const newItem: item_entity = new item_entity();
    newItem.name = createItemDto.name;
    this.itemRepository.save(newItem);
    return newItem;
  }
}
