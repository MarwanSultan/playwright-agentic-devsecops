import { test as base } from '@playwright/test';

import { PublicSiteClient } from '../api/clients/public-site.client';
import { getRuntimeConfig } from '../config/environment';

export type ApiFixtures = {
  publicSite: PublicSiteClient;
};

export const apiTest = base.extend<ApiFixtures>({
  publicSite: async ({ playwright }, use) => {
    const request = await playwright.request.newContext({
      baseURL: getRuntimeConfig().apiBaseUrl,
    });

    try {
      await use(new PublicSiteClient(request));
    } finally {
      await request.dispose();
    }
  },
});
