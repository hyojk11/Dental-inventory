import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  itemname: string;

  @IsNotEmpty()
  manufacturer: string;

  @IsNotEmpty()
  quantity: number;

  @IsOptional()
  etc: string;
}
