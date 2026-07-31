const { test, expect } = require('@playwright/test');

test.describe('Teacher Flow', () => {
  test('should load teacher dashboard', async ({ page }) => {
    await page.goto('/#/teacher-dashboard');
    await expect(page.locator('.td-page-title').first()).toContainText('Tổng quan');
  });
});
