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
import {
  eventInFocusDismissed,
  selectCalendarInFocus,
  selectSingleCalendarInFocus,
  useAppDispatch,
  useAppSelector,
} from '../store';

const MainPage = () => {
  const { t } = useTranslation();

  const modal = useRef<HTMLIonModalElement>(null);
  const selectedCalendarInFocus = useAppSelector(selectCalendarInFocus);
  const singleCalendarInFocus = useAppSelector(selectSingleCalendarInFocus);
  const dispatch = useAppDispatch();

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
            isOpen={singleCalendarInFocus && !isModalBackDismissed}
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
                style={{ '--background': selectedCalendarInFocus?.color }}>
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
                        <h1>{selectedCalendarInFocus?.title}</h1>
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
              <EventsList inner />
            </IonContent>
          </BackDismissibleModal>
          <EventsList />
        </ErrorBoundary>
      </IonContent>
    </IonPage>
  );
};

export default MainPage;
