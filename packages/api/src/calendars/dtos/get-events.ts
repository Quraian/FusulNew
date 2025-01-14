import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

import { GetEventsFilters } from './get-events-filters';

export class GetEventsQuery extends GetEventsFilters {
  @IsNumber()
  @Type(() => Number)
  page = 1;
}
