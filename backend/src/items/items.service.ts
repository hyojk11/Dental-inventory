import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from './item.entity';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemStatus } from './item-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async getAllItems(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  async createItem(
    createBoardDto: CreateItemDto,
    user: User,
  ): Promise<Item> {
    const { category, itemname, manufacturer, quantity, etc } = createBoardDto;
    const item = this.itemRepository.create({
      category,
      itemname,
      manufacturer,
      quantity,
      etc,
      status: ItemStatus.ACTIVE,
      user: user,
    });
    await this.itemRepository.save(item);
    return item;
  }

  async getItemById(id: number): Promise<Item> {
    const found = await this.itemRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Can't find Item with id ${id}`);
    }
    return found;
  }

  async deleteItem(id: number): Promise<void> {
    const result = await this.itemRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Item with id ${id}`);
    }
  }

  async updateItemStatus(id: number, status: ItemStatus): Promise<Item> {
    const item = await this.getItemById(id);
    item.status = status;
    await this.itemRepository.save(item);

    return item;
  }

  async updateItem(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    const item = await this.getItemById(id);
    Object.assign(item, updateItemDto);
    return this.itemRepository.save(item);
  }
}
