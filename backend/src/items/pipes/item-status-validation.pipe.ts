import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ItemStatus } from '../item-status.enum';

export class ItemStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [
    ItemStatus.ACTIVE,
    ItemStatus.INACTIVE,
    ItemStatus.DISCONTINUED,
  ];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status options`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
