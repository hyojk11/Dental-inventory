import { IsOptional } from 'class-validator';

export class UpdateItemDto {
  @IsOptional()
  category: string;

  @IsOptional()
  itemname: string;

  @IsOptional()
  manufacturer: string;

  @IsOptional()
  quantity: number;

  @IsOptional()
  etc: string;
}
