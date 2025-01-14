import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { waitInSeconds } from './utils';

@Injectable()
export class DelayInterceptor implements NestInterceptor {
  private delay: number;

  constructor(delay = 1) {
    this.delay = delay;
  }

  async intercept(
    _: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<unknown>> {
    await waitInSeconds(this.delay);
    return next.handle();
  }
}
