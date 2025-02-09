import { forwardRef } from 'react';
import {
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  IonNote,
  IonText,
  IonBadge,
} from '@ionic/react';

import { EventsByDateViewModel, titleCase } from '@fusul/common';
import {
  useAppSelector,
  selectPreferences,
  useAppDispatch,
  eventClicked,
} from '../store';
import { useRemainingFormatter } from './useRemainingFormatter';

export const EventListItem = forwardRef<
  HTMLIonItemElement,
  EventsByDateViewModel
>(
  (
    { events, startFormatted, startFormattedInHijri, weekday, remaining },
    ref
  ) => {
    const {
      showGregorian,
      showHijri,
      calendarOptions: {
        descriptions: descriptionsOption,
        remainingDays: remainingDaysOptions,
      },
    } = useAppSelector(selectPreferences);
    const remainingFormatted = useRemainingFormatter(remaining);
    const dispatch = useAppDispatch();

    console.log({ events });

    return (
      <IonItem ref={ref}>
        <IonGrid>
          <IonRow className="ion-align-items-center">
            <IonCol>
              {events.map((e) => (
                <IonRow
                  key={`${e.id}${e.title}`}
                  onClick={() => dispatch(eventClicked(e))}>
                  <IonCol className="ion-no-padding">
                    <IonRow>
                      <IonCol
                        size="auto"
                        className="ion-no-padding"
                        style={{ marginInlineEnd: 12 }}>
                        <div
                          style={{
                            backgroundColor: e.color,
                            height: 16,
                            width: 4,
                            borderRadius: 4,
                          }}
                        />
                      </IonCol>
                      <IonCol className="ion-no-padding">
                        <h1
                          style={{
                            fontSize: '.9rem',
                            fontWeight: '400',
                            margin: 0,
                          }}>
                          {titleCase(e.title)}
                        </h1>
                      </IonCol>
                    </IonRow>
                    {descriptionsOption !== 'none' && e.description && (
                      <IonNote
                        color="medium"
                        style={{
                          fontSize: '0.7rem',
                          lineHeight: 1.2,
                          marginInlineStart: 14,
                        }}>
                        {e.description}
                      </IonNote>
                    )}
                  </IonCol>
                </IonRow>
              ))}
            </IonCol>
            <IonCol
              size="auto"
              className="ion-text-center ion-align-items-center">
              {showGregorian && (
                <IonText style={{ display: 'block', fontSize: '0.9rem' }}>
                  {startFormatted}
                </IonText>
              )}
              {remainingDaysOptions !== 'none' && remainingFormatted && (
                <IonBadge
                  color="light"
                  style={{
                    display: 'block',
                    fontSize: '0.8rem',
                    fontWeight: 'normal',
                  }}>
                  {remainingFormatted}
                </IonBadge>
              )}
              {showHijri && (
                <IonText style={{ display: 'block', fontSize: '0.9rem' }}>
                  {startFormattedInHijri}
                </IonText>
              )}
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol size="auto" className="ion-no-padding">
              <IonText color="medium" style={{ fontSize: '0.9rem' }}>
                {weekday}
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonItem>
    );
  }
);
