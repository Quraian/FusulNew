export function readAppPort() {
  return process.env['PORT'] || process.env['APP_PORT'] || '3000';
}

export function readAppDomain() {
  return process.env['APP_DOMAIN'];
}

export function isTesting() {
  return readNodeEnvironment() === 'test';
}

export function isProduction() {
  return readNodeEnvironment() === 'production';
}

export function readNodeEnvironment() {
  return import.meta.env.MODE;
}

export function readRedisUrl() {
  return process.env['REDIS_URL'];
}

export function readRedisHost() {
  return process.env['REDIS_HOST'] || '0.0.0.0';
}

export function readRedisPort() {
  return parseInt(process.env['REDIS_PORT'] || '6379');
}

export function readWeatherApiKey() {
  const apiKey = process.env['OPEN_WEATHER_MAP_API_KEY'];

  if (!apiKey) {
    throw Error('Unable to get API key from environment variables.');
  }

  return apiKey;
}
