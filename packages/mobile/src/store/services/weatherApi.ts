import { Weather, WeatherSchema } from '@fusul/common';

import { api } from '../../common/services/api';
import { setUserCity } from '../slices/userSlice';

export const weatherApi = api.injectEndpoints({
  endpoints: (build) => ({
    fetchWeather: build.query<Weather, { lat: string; lon: string }>({
      query: ({ lat, lon }) => ({ url: 'weather', params: { lat, lon } }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled.then(({ data }) => {
            if (data.city) {
              dispatch(setUserCity(data.city));
            }
          });
        } catch (error) {
          console.log('Query failed:', error);
        }
      },
      transformResponse: (response) => WeatherSchema.parse(response),
      transformErrorResponse: (response) => response,
    }),
  }),
});

export const { useFetchWeatherQuery } = weatherApi;
