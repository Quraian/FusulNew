import { Fragment, memo } from 'react';
import {
  IonBadge,
  IonCol,
  IonContent,
  IonGrid,
  IonPopover,
  IonRow,
  IonSpinner,
  IonText,
} from '@ionic/react';

import { CommonProps } from '../common';
import { PrayersVm, usePrayers } from './usePrayers';
import Sunset from '../assets/icon/sunset.svg';
import Sunrise from '../assets/icon/sunrise.svg';
import { isEqual } from '@fusul/common';

const PrayersViewWrapper = ({
  sunrise,
  sunset,
  next,
  children,
  ...rest
}: CommonProps & Omit<PrayersVm, 'prayers'>) => (
  <IonGrid style={{ padding: 8 }} {...rest}>
    <IonRow className="ion-justify-content-between ion-align-items-center">
      <IonCol className="ion-no-padding">
        <IonRow className="ion-align-items-center">
          <IonCol size="auto">
            <img width={28} src={Sunrise} alt="sunrise" />{' '}
          </IonCol>
          <IonCol size="auto">
            <IonText style={{ fontSize: '1rem' }}>{sunrise}</IonText>
          </IonCol>
        </IonRow>
      </IonCol>
      <IonCol className="ion-text-center ion-no-padding">
        {next && (
          <IonBadge color="light ion-text-center" style={{ width: '100%' }}>
            <IonText style={{ fontSize: '1rem' }}>
              {next.name} {next.remaining}
            </IonText>
          </IonBadge>
        )}
      </IonCol>
      <IonCol className="ion-no-padding">
        <IonRow className="ion-align-items-center ion-justify-content-end">
          <IonCol size="auto">
            <IonText style={{ fontSize: '1rem' }}>{sunset}</IonText>
          </IonCol>
          <IonCol size="auto">
            <img width={28} src={Sunset} alt="sunset" />
          </IonCol>
        </IonRow>
      </IonCol>
    </IonRow>
    {children}
  </IonGrid>
);

const PrayersViewMemoized = memo(
  ({ status, prayers, errorMessage, ...rest }: CommonProps & PrayersVm) => {
    if (status === 'pending') {
      return (
        <PrayersViewWrapper {...rest}>
          <IonSpinner style={{ display: 'block', margin: '0 auto' }} />
        </PrayersViewWrapper>
      );
    }

    if (errorMessage) {
      return (
        <PrayersViewWrapper {...rest}>
          <IonText color="danger" className="ion-text-center">
            <h4>{errorMessage}</h4>
          </IonText>
        </PrayersViewWrapper>
      );
    }

    return (
      <PrayersViewWrapper {...rest}>
        <IonRow>
          {prayers.map(({ name, time, remaining }) => (
            <Fragment key={name}>
              <IonCol
                id={`click-trigger-${name}`}
                className="ion-no-padding ion-text-center">
                <IonText>
                  <h1 style={{ fontSize: '1rem' }}>{name}</h1>
                </IonText>
                <IonText>
                  <h1 style={{ fontSize: '1.2rem' }}>{time}</h1>
                </IonText>
              </IonCol>
              <IonPopover
                trigger={`click-trigger-${name}`}
                side="end"
                alignment="center"
                triggerAction="click"
                showBackdrop={false}
                animated={false}>
                <IonContent className="ion-padding">{remaining}</IonContent>
              </IonPopover>
            </Fragment>
          ))}
        </IonRow>
      </PrayersViewWrapper>
    );
  },
  (v, o) =>
    v.status === o.status &&
    v.errorMessage === o.errorMessage &&
    v.next?.name === o.next?.name &&
    v.next?.time === o.next?.time &&
    isEqual(v.prayers, o.prayers)
);

export const PrayersView = (props: CommonProps) => {
  const prayers = usePrayers();

  return <PrayersViewMemoized {...props} {...prayers} />;
};
