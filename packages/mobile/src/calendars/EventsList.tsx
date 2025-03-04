import { Fragment } from 'react';
import {
  IonFab,
  IonFabButton,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonList,
  IonSpinner,
} from '@ionic/react';
import { chevronCollapseOutline } from 'ionicons/icons';

import { useEvents } from './useEvents';
import { EventListItem } from './EventListItem';
import { DateView } from '../datetime/DateView';
import { useEventsUiHelper } from './useEventsUiHelper';

export const EventsList = ({ inner = false }: { inner?: boolean }) => {
  const events = useEvents(inner);
  const { eventsByDate, triggerFetchEvents, isLoading, nextPage, prevPage } =
    events;
  const { isTodayDateVisible, todayDateRef, setHasScrolled, setScrollEvent } =
    useEventsUiHelper({ events, inner });

  return (
    <>
      <IonFab
        hidden={isTodayDateVisible}
        slot="fixed"
        vertical="bottom"
        horizontal="end"
        className="ion-margin-bottom">
        <IonFabButton
          size="small"
          color="secondary"
          onClick={() => {
            todayDateRef.current?.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
            setHasScrolled(true);
          }}>
          <IonIcon icon={chevronCollapseOutline} />
        </IonFabButton>
      </IonFab>
      <IonInfiniteScroll
        disabled={!prevPage}
        position="top"
        onIonInfinite={(ev) => {
          setScrollEvent(ev);
          triggerFetchEvents(prevPage);
        }}>
        <IonInfiniteScrollContent></IonInfiniteScrollContent>
      </IonInfiniteScroll>

      <IonList lines="full" aria-label="events">
        {!eventsByDate?.length && isLoading ? (
          <IonSpinner
            role="alert"
            aria-label="Loading"
            style={{ display: 'block', margin: '0 auto', height: 320 }}
          />
        ) : (
          eventsByDate?.map(({ startFormatted, firstInTheFuture, ...rest }) => (
            <Fragment key={firstInTheFuture ? 'separator' : startFormatted}>
              {firstInTheFuture && (
                <IonItem ref={todayDateRef} color="light">
                  <DateView />
                </IonItem>
              )}
              <EventListItem {...rest} startFormatted={startFormatted} />
            </Fragment>
          ))
        )}
      </IonList>
      <IonInfiniteScroll
        disabled={!nextPage}
        position="bottom"
        threshold="10px"
        onIonInfinite={(ev) => {
          setScrollEvent(ev);
          triggerFetchEvents(nextPage);
        }}>
        <IonInfiniteScrollContent></IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </>
  );
};
