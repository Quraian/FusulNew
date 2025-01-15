import { Position } from '@capacitor/geolocation';

export const Geolocation = {
  async getCurrentPosition(): Promise<Position> {
    const sample: Position = {
      timestamp: 1,
      coords: {
        latitude: 24.7125657,
        longitude: 46.6764285,
        accuracy: 11.48,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
      },
    };

    return Promise.resolve(sample);
  },
};
