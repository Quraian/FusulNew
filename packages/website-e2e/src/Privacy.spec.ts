import { test, expect } from '@playwright/test';

test.describe('Home', () => {
  test('has privacy content', async ({ page }) => {
    await page.goto('/privacy');

    const title = page.locator('text=This privacy policy applies to');
    await expect(title).toBeVisible();
  });
});
