import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { ItemService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';

@Controller('items')
export class ItemController {
  constructor(private readonly itemservice: ItemService) {}

  @Get()
  async getAll() {
    const result = this.itemservice.getAll();
    if (!result) {
      throw new BadRequestException('couldnt retrieve all item');
    }
    return result;
  }

  @Post()
  async createOne(@Body() createItemDto: CreateItemDto) {
    const result = this.itemservice.createOne(createItemDto);
    if (!result) {
      throw new BadRequestException('couldnt create a new item');
    }
    return result;
  }
}
