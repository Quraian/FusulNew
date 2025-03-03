export function readAppPort() {
  return import.meta.env['PORT'] || import.meta.env['APP_PORT'] || '3000';
}

export function readAppDomain() {
  return import.meta.env['APP_DOMAIN'];
}

export function isTesting() {
  return import.meta.env.MODE === 'test';
}

export function isProduction() {
  return import.meta.env.MODE === 'production';
}

export function readRedisUrl() {
  return import.meta.env['REDIS_URL'];
}

export function readRedisHost() {
  return import.meta.env['REDIS_HOST'] || '0.0.0.0';
}

export function readRedisPort() {
  return parseInt(import.meta.env['REDIS_PORT'] || '6379');
}

export function readWeatherApiKey() {
  const apiKey = import.meta.env['OPEN_WEATHER_MAP_API_KEY'];

  if (!apiKey) {
    throw Error('Unable to get API key from environment variables.');
  }

  return apiKey;
}
