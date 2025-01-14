import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';

import { Calendar } from '@fusul/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CalendarByIdPipe
  implements PipeTransform<string, Promise<Calendar | null>>
{
  constructor(private prismaService: PrismaService) {}

  async transform(
    value: string,
    metadata: ArgumentMetadata
  ): Promise<Calendar | null> {
    const id = await new ParseIntPipe().transform(value, metadata);
    const calendar = await this.prismaService.calendar.findFirst({
      where: { id },
    });

    if (!calendar) {
      throw new NotFoundException(`Calendar with id ${id} is unavailable`);
    }

    return calendar;
  }
}
