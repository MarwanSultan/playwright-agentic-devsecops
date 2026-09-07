import { expect } from '@playwright/test';

import { apiTest as test } from '../../fixtures/api';

test.describe('public site HTTP contract', () => {
  test('supports a safe read-only homepage request', async ({ publicSite }) => {
    const response = await publicSite.get('/');

    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toMatch(/text\/html/i);
    expect(await response.text()).toContain('<html');
  });
});
