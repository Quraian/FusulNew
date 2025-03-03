import {
  SubscriptionOptions,
  createApi,
  fetchBaseQuery,
  retry,
} from '@reduxjs/toolkit/query/react';

export const NetworkConstants: SubscriptionOptions = {
  refetchOnFocus: false,
  refetchOnReconnect: true,
  pollingInterval: 60 * 1000,
} as const;

const apiBseUrl = import.meta.env['VITE_API_URL'];

const baseQuery = fetchBaseQuery({
  // fetchFn is required otherwise the following warning will show up during testing
  // Warning: `fetch` is not available. Please supply a custom `fetchFn` property to use `fetchBaseQuery` on SSR environments.
  // fetchFn: (input: RequestInfo, init?: RequestInit | undefined) => fetch(input, init),
  baseUrl: `${apiBseUrl ?? ''}/api/`,
});

const baseQueryWithRetry = retry(baseQuery, {
  maxRetries: import.meta.env.PROD ? 3 : 0,
});

/**
 * Create a base API to inject endpoints into elsewhere.
 * Components using this API should import from the injected site,
 * in order to get the appropriate types,
 * and to ensure that the file injecting the endpoints is loaded
 */
export const api = createApi({
  baseQuery: baseQueryWithRetry,
  /**
   * Tag types must be defined in the original API definition
   * for any tags that would be provided by injected endpoints
   */
  // tagTypes: ['Events'],
  /**
   * This api has endpoints injected in adjacent files,
   * which is why no endpoints are shown below.
   * If you want all endpoints defined in the same file, they could be included here instead
   */
  endpoints: () => ({}),
});
