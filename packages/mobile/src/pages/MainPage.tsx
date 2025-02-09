import { useRef, useState } from 'react';
import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonText,
  IonToolbar,
} from '@ionic/react';
import { useTranslation } from 'react-i18next';

import {
  BackDismissibleModal,
  CardContainer,
  ErrorBoundary,
  TopBar,
} from '../common/components';
import { EventsList } from '../calendars/EventsList';
import { PrayersView } from '../prayers/PrayersView';
import { eventInFocusDismissed, useAppDispatch } from '../store';
import { useEvents } from '../calendars/useEvents';

const MainPage = () => {
  const { t } = useTranslation();

  const modal = useRef<HTMLIonModalElement>(null);
  const dispatch = useAppDispatch();

  const { eventsByDateMain, eventsByDateInner, ...eventsRest } = useEvents();
  // Dismiss the modal when the back button is pressed
  const [isModalBackDismissed, setIsModalBackDismissed] = useState(false);

  return (
    <IonPage style={{ backgroundColor: 'white' }} id="main-content">
      <IonHeader
        style={{
          height: 110,
          backgroundColor: 'var(--ion-color-primary)',
        }}>
        <ErrorBoundary error={t('UnableLoadWeather')}>
          <IonToolbar color="primary" className="ion-no-border">
            <TopBar />
          </IonToolbar>
        </ErrorBoundary>
        <CardContainer
          style={{ height: 110, margin: 8, borderRadius: 12 }}
          className="ion-no-padding">
          <PrayersView />
        </CardContainer>
      </IonHeader>
      <IonContent
        scrollEvents
        fixedSlotPlacement="before"
        className="ion-padding scroll-container">
        <ErrorBoundary error={t('UnableLoadEvents')}>
          <BackDismissibleModal
            isOpen={eventsRest.singleCalendarInFocus && !isModalBackDismissed}
            onDismiss={() => setIsModalBackDismissed(true)}
            onDidDismiss={() => {
              dispatch(eventInFocusDismissed());
              setIsModalBackDismissed(false);
            }}
            ref={modal}
            initialBreakpoint={0.85}
            handle={false}>
            <IonHeader>
              <IonToolbar
                style={{
                  '--background': eventsRest.selectedCalendarInFocus?.color,
                }}>
                <IonGrid>
                  <IonRow>
                    <IonCol size="12">
                      <IonText
                        className="ion-text-center"
                        style={{
                          borderRadius: 8,
                          padding: 8,
                          display: 'block',
                          width: '100%',
                          color: 'white',
                        }}>
                        <h1>{eventsRest.selectedCalendarInFocus?.title}</h1>
                      </IonText>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonToolbar>
            </IonHeader>
            <IonContent
              scrollEvents
              style={{ height: '74vh' }}
              className="scroll-container-inner">
              <EventsList
                {...eventsRest}
                eventsByDate={eventsByDateInner}
                containerClassName="scroll-container-inner"
              />
            </IonContent>
          </BackDismissibleModal>
          <EventsList {...eventsRest} eventsByDate={eventsByDateMain} />
        </ErrorBoundary>
      </IonContent>
    </IonPage>
  );
};

export default MainPage;
