import { readWeatherApiKey } from '@fusul/common';

export function buildWeatherUrl(cityName: string): string {
  const apiKey = readWeatherApiKey();

  return `https://api.openweathermap.org/data/2.5/weather?q=${cityName},sa&units=metric&appid=${apiKey}`;
}

export function waitInSeconds(waitTime: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, waitTime * 1000);
  });
}
