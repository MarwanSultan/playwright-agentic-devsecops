import { test as base } from '@playwright/test';

import { getRuntimeConfig, type RuntimeConfig } from '../config/environment';
import { HomePage } from '../pages/home.page';

export type FrameworkFixtures = {
  homePage: HomePage;
  runtimeConfig: RuntimeConfig;
};

export const test = base.extend<FrameworkFixtures>({
  runtimeConfig: async ({ page: _page }, use) => {
    await use(getRuntimeConfig());
  },

  homePage: async ({ page }, use) => {
    const response = await page.goto('/', { waitUntil: 'domcontentloaded' });
    if (!response || response.status() >= 400) {
      throw new Error(`Homepage navigation failed with status ${response?.status() ?? 'unknown'}`);
    }

    await use(new HomePage(page));
  },
});

export { expect } from '@playwright/test';
