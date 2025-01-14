import { vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { Server } from 'net';

import { AppModule } from '../src/app.module';
import { prepareApp } from '../src/main';
import { allCalendars, paginatedEvents } from './expectations';

describe('Calendars (e2e)', () => {
  let app: INestApplication<Server>;
  let moduleFixture: TestingModule;

  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2022-12-04T10:52:57.532Z'));
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    prepareApp(app);

    await app.init();
  });

  describe('Success scenarios', () => {
    test.skip.each([
      { endpoint: '/api/calendars', expected: allCalendars },
      {
        endpoint: '/api/calendars/events?perPage=5&page=7',
        expected: paginatedEvents,
      },
    ])('should return expected data', async ({ endpoint, expected }) => {
      const response = await request(app.getHttpServer()).get(endpoint);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expected);
    });
  });

  describe('Failure scenarios', () => {
    test.each([
      {
        endpoint: '/api/calendars/666',
        expectedCode: 404,
        expectedMessage: 'Calendar with id 666 is unavailable',
      },
      {
        endpoint: '/api/calendars/events?year=a',
        expectedCode: 400,
        expectedMessage: 'year must be a number string',
      },
    ])(
      'should return expected error code and message',
      async ({ endpoint, expectedCode, expectedMessage }) => {
        const response = await request(app.getHttpServer()).get(endpoint);

        expect(response.statusCode).toEqual(expectedCode);
        expect((response.body as HttpException).message).toContain(
          expectedMessage
        );
      }
    );
  });
});
