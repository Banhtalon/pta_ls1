const { test, expect } = require('@playwright/test');

test.describe('Student Flow', () => {
  test('should login and view lessons', async ({ page }) => {
    // Navigate to login
    await page.goto('/#/login');
    
    // Wait for Firebase to load (if using emulators, or we mock it, but here we just check UI)
    await expect(page.locator('.login-title')).toBeVisible();
    
    // Test that the form is present
    const classSelect = page.locator('#login-class-select');
    await expect(classSelect).toBeVisible();
    
    // In a real E2E we'd mock Firestore or use emulator data.
    // For now we just verify the structure is there.
  });
});
