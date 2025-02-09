import { Fragment, memo, useEffect, useRef, useState } from 'react';
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
import { EventsByDateViewModel } from '@fusul/common';

export const EventsList = memo(
  ({
    eventsByDate,
    triggerFetchEvents,
    isLoading,
    isFetching,
    nextPage,
    prevPage,
    containerClassName = 'scroll-container',
  }: Omit<UseEventsViewModel, 'eventsByDateMain' | 'eventsByDateInner'> & {
    containerClassName?: string;
    eventsByDate: EventsByDateViewModel[];
  }) => {
    const [scrollEvent, setScrollEvent] = useState<
      IonInfiniteScrollCustomEvent<void> | undefined
    >();
    const itemRef = useRef<HTMLIonItemElement>(null);
    const [isItemVisible, setIsItemVisible] = useState(true);
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
      if (!isFetching) {
        scrollEvent?.target.complete();
      }
    }, [isFetching, scrollEvent]);

    useEffect(() => {
      triggerFetchEvents();
    }, [triggerFetchEvents]);

    useEffect(() => {
      const currentItemRef = itemRef?.current;
      const observer = new IntersectionObserver(
        ([entry]) => {
          // Update visibility state based on whether the item is in the viewport
          setIsItemVisible(entry.isIntersecting);
        },
        {
          root: document.querySelector(`.${containerClassName}`), // The scrollable container
          threshold: 1, // Trigger if at least 100% of the item is visible
        }
      );

      if (currentItemRef) {
        observer.observe(currentItemRef);
      }

      return () => {
        if (currentItemRef) {
          observer.unobserve(currentItemRef);
        }
      };
    }, [containerClassName, eventsByDate]);

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        if (!hasScrolled) {
          itemRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }
      }, 100);

      return () => clearTimeout(timeoutId);
    }, [hasScrolled]);

    return (
      <>
        <IonFab
          hidden={isItemVisible}
          slot="fixed"
          vertical="bottom"
          horizontal="end"
          className="ion-margin-bottom">
          <IonFabButton
            size="small"
            color="secondary"
            onClick={() => {
              itemRef.current?.scrollIntoView({
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
            eventsByDate?.map(
              ({ startFormatted, firstInTheFuture, ...rest }) => (
                <Fragment key={firstInTheFuture ? 'separator' : startFormatted}>
                  {firstInTheFuture && (
                    <IonItem color="light">
                      <DateView />
                    </IonItem>
                  )}
                  <EventListItem
                    {...(firstInTheFuture ? { ref: itemRef } : {})}
                    {...rest}
                    startFormatted={startFormatted}
                    firstInTheFuture={firstInTheFuture}
                  />
                </Fragment>
              )
            )
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
  }
);
