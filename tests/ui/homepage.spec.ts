import { expect, test } from '../../fixtures/test';

test.describe('VA.gov homepage', () => {
  test('loads the configured homepage through the fixture', async ({ homePage, runtimeConfig }) => {
    await expect(homePage.page).toHaveURL(new RegExp(`^${runtimeConfig.baseUrl}`));
    await expect(homePage.page).toHaveTitle(/VA|Veterans Affairs/i);
  });

  test('exposes a primary navigation landmark', async ({ homePage }) => {
    await expect(homePage.primaryNavigation).toBeVisible();
  });
});
