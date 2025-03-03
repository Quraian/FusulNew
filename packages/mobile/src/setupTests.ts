// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom/vitest';
import 'whatwg-fetch';
import { setupIonicReact } from '@ionic/react';
import nock from 'nock';
import { beforeAll } from 'vitest';

setupIonicReact();

// Mock matchmedia
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

setupIonicReact();

const unBlockedDomains = [import.meta.env['APP_DOMAIN'] ?? 'localhost'];
nock.enableNetConnect((host) =>
  Boolean(unBlockedDomains.find((domain) => host.includes(domain)))
);

beforeAll(() => {
  class MockIntersectionObserver implements IntersectionObserver {
    root: Element | null = null;
    rootMargin: string = '';
    thresholds: ReadonlyArray<number> = [];

    constructor() {}

    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }

  global.IntersectionObserver =
    MockIntersectionObserver as unknown as typeof IntersectionObserver;
});
