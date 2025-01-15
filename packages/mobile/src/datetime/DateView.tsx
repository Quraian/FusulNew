import { IonLabel } from '@ionic/react';
import { useDateTime } from './useDateTime';

export const DateView = () => {
  const { dateFormatted, dateFormattedHijri } = useDateTime();

  return (
    <IonLabel className="ion-text-center">
      <h2 style={{ fontSize: '1.2rem', margin: 0 }}>{dateFormatted}</h2>
      <h2 style={{ fontSize: '1.2rem', margin: 0 }}>{dateFormattedHijri}</h2>
    </IonLabel>
  );
};

/* This to test formatDate */
/* <h1>{formatDate(new Date('1937-01-13'), true, 'en-SA', DateTime.DATE_FULL)}</h1> */
