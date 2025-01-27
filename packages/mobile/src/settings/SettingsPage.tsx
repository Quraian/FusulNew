import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useTranslation } from 'react-i18next';

import { CalendarSettings } from './CalendarSettings';

export const SettingsPage = () => {
  const { t } = useTranslation();

  return (
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>{t('Settings')}</IonTitle>
          <IonButtons slot="start">
            <IonBackButton text={t('Back')} defaultHref="/"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <CalendarSettings />
      </IonContent>
    </IonPage>
  );
};
