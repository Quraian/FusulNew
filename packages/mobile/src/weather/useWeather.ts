import { isEmpty } from '@fusul/common';
import {
  NetworkConstants,
  isFetchBaseQueryError,
  isSerializedError,
} from '../common';
import { useAppSelector, selectLocation } from '../store';
import { useFetchWeatherQuery, weatherApi } from '../store/services/weatherApi';

export function useWeather() {
  const { result, errorMessage: locationErrorMessage } =
    useAppSelector(selectLocation);
  const lat = result?.latitude.toString() || '';
  const lon = result?.longitude.toString() || '';

  const {
    isError: isWeatherFetchError,
    error: weatherFetchError,
    isFetching,
    isLoading,
  } = useFetchWeatherQuery(
    { lat, lon },
    { ...NetworkConstants, skip: isEmpty(lat) || isEmpty(lon) }
  );

  const { data: weather } = useAppSelector(
    weatherApi.endpoints.fetchWeather.select({ lat, lon })
  );

  if (locationErrorMessage) {
    console.error(`Unable to get location`, locationErrorMessage);
  }

  if (isWeatherFetchError) {
    if (isFetchBaseQueryError(weatherFetchError)) {
      const errMsg =
        'error' in weatherFetchError
          ? weatherFetchError.error
          : JSON.stringify(weatherFetchError.data);

      console.error(`Unable to to fetch weather`, errMsg);
    }

    if (isSerializedError(weatherFetchError)) {
      console.error(`Unable to to fetch weather`, weatherFetchError.message);
    }
  }

  return {
    weather,
    isError: isWeatherFetchError,
    isFetching,
    isLoading,
  };
}
