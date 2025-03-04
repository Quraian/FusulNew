import { IonInfiniteScrollCustomEvent } from '@ionic/core';
import { useState, useRef, useEffect } from 'react';

import { UseEventsViewModel } from './useEvents';

export function useEventsUiHelper({
  events,
  inner,
}: {
  events: UseEventsViewModel;
  inner?: boolean;
}) {
  const { eventsByDate, isFetching, triggerFetchEvents } = events;
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
    const containerSelector = `.scroll-container${inner ? '-inner' : ''}`;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setTodayDateVisible(entry.isIntersecting);
      },
      {
        root: document.querySelector(containerSelector),
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
  }, [eventsByDate, inner]);

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

  return { todayDateRef, setScrollEvent, isTodayDateVisible, setHasScrolled };
}
