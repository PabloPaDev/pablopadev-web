const { test, expect } = require('@playwright/test');

test('Volta page screenshot', async ({ page }) => {
  await page.goto('http://localhost:3000/volta');
  await page.screenshot({ path: '/home/jules/verification/volta-page.png' });
});
