import { Fragment, useEffect, useRef, useState } from 'react';
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
import { IonInfiniteScrollCustomEvent } from '@ionic/core';
import { chevronCollapseOutline } from 'ionicons/icons';

import { UseEventsViewModel } from './useEvents';
import { EventListItem } from './EventListItem';
import { DateView } from '../datetime/DateView';

export const EventsList = (
  props: UseEventsViewModel & { containerClassName?: string }
) => {
  const {
    eventsByDate,
    triggerFetchEvents,
    isLoading,
    isFetching,
    nextPage,
    prevPage,
    containerClassName = 'scroll-container',
  } = props;
  const [scrollEvent, setScrollEvent] = useState<
    IonInfiniteScrollCustomEvent<void> | undefined
  >();
  const todayDateRef = useRef<HTMLIonItemElement>(null);
  const [isTodayDateVisible, setTodayDateVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    if (!isFetching) {
      scrollEvent?.target.complete();
    }
  }, [isFetching, scrollEvent]);

  useEffect(() => {
    triggerFetchEvents();
  }, [triggerFetchEvents]);

  // Set FAB visibility based on whether the item is in the viewport
  useEffect(() => {
    const currentTodayDateRef = todayDateRef?.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setTodayDateVisible(entry.isIntersecting);
      },
      {
        root: document.querySelector(`.${containerClassName}`),
        threshold: 1, // Trigger if at least 100% of the item is visible
      }
    );

    if (currentTodayDateRef) {
      observer.observe(currentTodayDateRef);
    }

    return () => {
      if (currentTodayDateRef) {
        observer.unobserve(currentTodayDateRef);
      }
    };
  }, [containerClassName, eventsByDate]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!hasScrolled) {
        todayDateRef.current?.scrollIntoView({
          behavior: 'instant',
          block: 'center',
        });
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [hasScrolled]);

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
