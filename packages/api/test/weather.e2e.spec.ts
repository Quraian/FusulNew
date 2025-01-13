import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, INestApplication } from '@nestjs/common';
import request from 'supertest';
import nock from 'nock';
import { Server } from 'net';

import { Weather } from '@fusul/common';
import riyadhSampleWeather from './expectations/riyadh-weather.json';
import { AppModule } from '../src/app.module';
import { prepareApp } from '../src/main';
import { RedisService } from '../src/redis/redis.service';

const expectedWeather: Weather = {
  city: {
    id: 2,
    name: 'الرياض',
    nameEn: 'Riyadh',
    lat: 24.687731,
    lon: 46.721851,
  },
  cityId: 2,
  icon: '04d',
  main: 'Clouds',
  description: 'overcast clouds',
  temperature: 40.29,
};

const RIYADH_WEATHER_URL = '/api/weather?cityName=riyadh';

describe('Weather (e2e)', () => {
  let app: INestApplication<Server>;
  let moduleFixture: TestingModule;

  beforeEach(() => {
    nock('https://api.openweathermap.org')
      .get('/data/2.5/weather')
      .query((query) => !!query['q']?.toString().toLowerCase())
      .reply(200, riyadhSampleWeather);
  });

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prepareApp(app);
    await app.init();
  });

  afterEach(() => {
    nock.cleanAll();
    const redisService = moduleFixture.get<RedisService>(RedisService);
    return redisService.flushAll();
  });

  describe('Success scenarios', () => {
    test.each([
      { endpoint: RIYADH_WEATHER_URL, expected: expectedWeather },
      {
        endpoint: '/api/weather?lat=24.737651&lon=46.494640',
        expected: expectedWeather,
      },
    ])('should return expected data', async ({ endpoint, expected }) => {
      const response = await request(app.getHttpServer()).get(endpoint);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual(expected);
    });

    it('gets cached weather', () =>
      new Promise((done) => {
        request(app.getHttpServer())
          .get(RIYADH_WEATHER_URL)
          // eslint-disable-next-line sonarjs/no-nested-functions
          .then((response) => {
            expect(response.status).toBe(200);
            expect(response.body).toStrictEqual(expectedWeather);

            setTimeout(() => {
              nock.cleanAll();
              nock('https://api.openweathermap.org')
                .get('/data/2.5/weather')
                .query((query) => !!query['q']?.toString().toLowerCase())
                .reply(200, {
                  ...riyadhSampleWeather,
                  main: { ...riyadhSampleWeather.main, temp: 30 },
                })
                .persist();

              request(app.getHttpServer())
                .get(RIYADH_WEATHER_URL)
                .then((secondResponse) => {
                  expect(secondResponse.status).toBe(200);
                  expect(secondResponse.body).toStrictEqual(expectedWeather);

                  done(null);
                });
            }, 0); // increase the timeout and decrease the cache time value in RedisService to confirm it fails
          });
      }));
  });

  describe('Failure scenarios', () => {
    test.each([
      {
        endpoint: '/api/weather?cityName=some-random-text',
        expectedCode: 404,
        expectedMessage: 'Unable to find city some-random-text',
      },
      {
        endpoint: '/api/weather?lat=aaa&lon=46.494640',
        expectedCode: 400,
        expectedMessage: 'lat must be a number string',
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
