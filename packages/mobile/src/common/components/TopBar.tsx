import { IonCol, IonGrid, IonMenuButton, IonRow } from '@ionic/react';

import { CommonProps } from '../types';
import { WeatherView } from '../../weather/WeatherView';

export const TopBar = ({ style }: CommonProps) => {
  return (
    <IonGrid style={{ ...style, color: 'white', fontSize: '1.6rem' }}>
      <IonRow className="ion-justify-content-between">
        <IonCol size="2" className="ion-no-padding">
          <IonMenuButton color="light" />
        </IonCol>
        <IonCol size="3" className="ion-no-padding">
          <WeatherView />
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
