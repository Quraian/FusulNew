import { useEffect } from 'react';
import { EventEmitter } from 'eventemitter3';

// from: https://medium.com/@nouraldin.alsweirki/pub-sub-pattern-in-react-example-c5bbd08fa02f

const emitter = new EventEmitter();

type AppEventType = 'SCROLL_TO_CURRENT';

export const useSub = (event: AppEventType, callback: () => void) => {
  useEffect(() => {
    emitter.on(event, callback);

    return () => {
      emitter.off(event, callback);
    };
  }, [callback, event]);
};

export const usePub = () => {
  return (event: AppEventType, data: unknown) => {
    emitter.emit(event, data);
  };
};
