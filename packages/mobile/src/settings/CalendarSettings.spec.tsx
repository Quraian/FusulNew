import { describe, it, expect } from 'vitest';

import { CalendarSettings } from './CalendarSettings';
import { renderWithProviders } from '../test-utils';

describe('CalendarSettings', () => {
  it('should render successfully', () => {
    const { baseElement } = renderWithProviders(<CalendarSettings />);
    expect(baseElement).toBeTruthy();
  });
});
