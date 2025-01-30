import { test, expect } from '@playwright/test';

test.describe('Home', () => {
  test('has title', async ({ page }) => {
    await page.goto('/');

    const title = page.locator('text=calendars in Hijri');
    await expect(title).toBeVisible();
  });
});
