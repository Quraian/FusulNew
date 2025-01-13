import { Optional } from '@nestjs/common';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsNumber, IsNumberString } from 'class-validator';

import { EventConstants } from '@fusul/common';

export class GetEventsFilters {
  @IsNumber()
  @Type(() => Number)
  @Optional()
  perPage?: number = EventConstants.LIST_ITEMS_COUNT;

  @IsNumberString()
  @Optional()
  year?: number;

  // TODO: test endpoint
  @IsArray()
  @Transform(({ value }: { value: string }) =>
    decodeURIComponent(value).toString().split(',').map(Number)
  )
  calendars?: number[];
}
