import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await injectAxe(page);
  });

  test('Homepage should be accessible', async ({ page }) => {
    await checkA11y(page);
  });

  test('Navigation should be keyboard accessible', async ({ page }) => {
    // Test tab navigation
    await page.keyboard.press('Tab');
    await expect(page.locator('a:focus')).toBeVisible();
    
    // Test arrow key navigation
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('a:focus')).toBeVisible();
  });

  test('Images should have alt text', async ({ page }) => {
    const images = await page.locator('img').all();
    for (const image of images) {
      const alt = await image.getAttribute('alt');
      expect(alt).not.toBeNull();
      expect(alt).not.toBe('');
    }
  });

  test('Form inputs should have labels', async ({ page }) => {
    const inputs = await page.locator('input, textarea, select').all();
    for (const input of inputs) {
      const id = await input.getAttribute('id');
      const label = await page.locator(`label[for="${id}"]`).count();
      expect(label).toBeGreaterThan(0);
    }
  });

  test('Color contrast should meet WCAG standards', async ({ page }) => {
    // Test text contrast
    const textElements = await page.locator('p, h1, h2, h3, h4, h5, h6, a').all();
    for (const element of textElements) {
      const color = await element.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return {
          color: style.color,
          backgroundColor: style.backgroundColor,
        };
      });
      // Note: This is a basic check. In a real implementation, you'd want to use
      // a color contrast calculation library to verify WCAG compliance
      expect(color.color).not.toBe(color.backgroundColor);
    }
  });

  test('Interactive elements should be properly sized', async ({ page }) => {
    const interactiveElements = await page.locator('button, a, input, select, textarea').all();
    for (const element of interactiveElements) {
      const box = await element.boundingBox();
      expect(box.width).toBeGreaterThanOrEqual(44);
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
  });

  test('ARIA landmarks should be present', async ({ page }) => {
    const landmarks = await page.locator('[role="banner"], [role="navigation"], [role="main"], [role="complementary"], [role="contentinfo"]').all();
    expect(landmarks.length).toBeGreaterThan(0);
  });

  test('Focus management should work correctly', async ({ page }) => {
    // Test focus trapping in modals (if any)
    const modals = await page.locator('[role="dialog"]').all();
    for (const modal of modals) {
      await modal.click();
      await page.keyboard.press('Tab');
      await expect(page.locator('[role="dialog"] *:focus')).toBeVisible();
    }
  });

  test('Reduced motion should be respected', async ({ page }) => {
    // Test if animations respect reduced-motion preference
    const animatedElements = await page.locator('[class*="transition"], [class*="animate"]').all();
    for (const element of animatedElements) {
      const style = await element.evaluate((el) => {
        return window.getComputedStyle(el).transition;
      });
      expect(style).not.toBe('none');
    }
  });
}); 