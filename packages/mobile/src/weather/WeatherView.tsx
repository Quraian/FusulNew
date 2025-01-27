import { IonCol, IonRow, IonSpinner, IonText } from '@ionic/react';
import { useHistory } from 'react-router';

import { useAppSelector, selectPreferences } from '../store';
import { useWeather } from './useWeather';

export const WeatherView = () => {
  const { locale } = useAppSelector(selectPreferences);
  const { weather, isLoading } = useWeather();
  const history = useHistory();

  const icon = weather?.icon || 'unknown.png';
  const temperature =
    weather && Math.round(weather.temperature).toLocaleString(locale);
  const basename = history.createHref({ pathname: '/' });

  return (
    <IonRow className="ion-justify-content-center">
      {isLoading && (
        <IonCol size="auto" className="ion-no-padding">
          <IonSpinner color="light" style={{ height: 22 }} />
        </IonCol>
      )}
      {weather && (
        <>
          <IonText color="light">{temperature}°</IonText>
          <img
            width="36px"
            src={`${basename}assets/icon/weather/${icon}.svg`}
            alt={weather.description}
          />
        </>
      )}
    </IonRow>
  );
};
