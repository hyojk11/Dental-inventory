import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemStatus } from './item-status.enum';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemStatusValidationPipe } from './pipes/item-status-validation.pipe';
import { Item } from './item.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('items')
@UseGuards(AuthGuard())
export class ItemsController {
  private logger = new Logger('ItemsController');
  constructor(private itemsService: ItemsService) {}
  @Get()
  getAllitem(): Promise<Item[]> {
    return this.itemsService.getAllItems();
  }
  @Post()
  @UsePipes(ValidationPipe)
  createItem(
    @Body() createItemDto: CreateItemDto,
    @GetUser() user: User,
  ): Promise<Item> {
    this.logger.verbose(`User $\{user.email} creating new item. Payload: ${JSON.stringify(createItemDto)}`);
    return this.itemsService.createItem(createItemDto, user);
  }
  @Get('/:id')
  getItemById(@Param('id') id: number): Promise<Item> {
    return this.itemsService.getItemById(id);
  }
  @Delete('/:id')
  deleteItem(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.itemsService.deleteItem(id);
  }
  @Patch('/:id/status')
  updateItemStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', ItemStatusValidationPipe) status: ItemStatus,
  ) {
    return this.itemsService.updateItemStatus(id, status);
  }
  @Patch('/:id')
  updateItem(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateItemDto: UpdateItemDto,
  ): Promise<Item> {
    console.log('Patch/items/:id 호출됨', id, updateItemDto);
    return this.itemsService.updateItem(id, updateItemDto);
  }
}
