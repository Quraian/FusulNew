import { test, expect } from '@playwright/test';

test.describe('Page titles', () => {
  test('has title (Arabic)', async ({ page }) => {
    await page.goto('/main');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/فصول \| تقويم وأكثر/);
  });

  test('has title (English)', async ({ page }) => {
    await page.goto('/main');
    await page.getByRole('button', { name: 'menu' }).click();
    await page.locator('#select-label').getByText('عربي').click();
    await page.getByRole('radio', { name: 'English' }).click();
    await page.getByRole('button', { name: 'موافق' }).click();
    await expect(page).toHaveTitle(/Fusul \| Calendar & more../);
  });
});
