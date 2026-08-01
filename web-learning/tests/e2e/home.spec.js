import { test, expect } from '@playwright/test';

test('home renders three course cards and the 42-lesson contract', async ({ page }) => {
  await page.goto('/#/');
  await expect(page.getByRole('heading', { name: /Học lập trình web/i })).toBeVisible();
  await expect(page.locator('.course-card')).toHaveCount(3);
  await expect(page.locator('.pathway-stat')).toContainText('42');
  await expect(page.locator('.pathway-stat')).toContainText('bài học');
  await expect(page.locator('img')).toHaveCount(4);
  const imageStates = await page.locator('img').evaluateAll((images) => images.map((image) => image.complete && image.naturalWidth > 0));
  expect(imageStates).toEqual([true, true, true, true]);
});

for (const course of ['web-basic', 'web-advance', 'web-intensive']) {
  test(`${course} exposes 14 draft lessons`, async ({ page }) => {
    await page.goto(`/#/${course}`);
    await expect(page.locator('.lesson-card')).toHaveCount(14);
    await expect(page.getByText('Nội dung đang cập nhật', { exact: true })).toBeVisible();
  });
}

test('draft lesson route shows coming-soon state without content controls', async ({ page }) => {
  await page.goto('/#/web-basic/1');
  await expect(page.getByRole('heading', { name: 'Nội dung đang được chuẩn bị' })).toBeVisible();
  await expect(page.getByText('Code Lab')).toHaveCount(0);
});

test('header provides a return link to PyLearn', async ({ page }) => {
  await page.goto('/#/web-basic');
  await expect(page.getByRole('link', { name: 'Học Python' })).toHaveAttribute('href', '../../');
});

test('unknown route shows a recoverable 404', async ({ page }) => {
  await page.goto('/#/missing-route');
  await expect(page.getByRole('heading', { name: /Trang này chưa có/i })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Về trang chủ', exact: true })).toBeVisible();
});

test('mobile navigation can be opened and closed', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/#/');
  const toggle = page.getByRole('button', { name: 'Menu' });
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.getByRole('link', { name: 'Web Basic' }).click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});
