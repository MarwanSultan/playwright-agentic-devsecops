import { expect, test } from '../../fixtures/test';

test.describe('network routing behavior', () => {
  test('captures and fulfills a deterministic API response', async ({ page, homePage }) => {
    const requests: string[] = [];
    page.on('request', (request) => requests.push(request.method()));

    await page.route('**/api/test-search', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ results: ['benefits'] }),
      });
    });

    const payload = await homePage.page.evaluate(async () => {
      const response = await fetch('/api/test-search');
      return response.json();
    });

    expect(payload).toEqual({ results: ['benefits'] });
    expect(requests).toContain('GET');
  });

  test('aborts a selected request without affecting the homepage fixture', async ({
    page,
    homePage,
  }) => {
    await page.route('**/api/simulated-failure', (route) => route.abort('failed'));

    const result = await homePage.page.evaluate(async () => {
      try {
        await fetch('/api/simulated-failure');
        return 'unexpected-success';
      } catch {
        return 'network-failure';
      }
    });

    expect(result).toBe('network-failure');
  });

  test('continues a document request with an added diagnostic header', async ({
    page,
    runtimeConfig,
  }) => {
    let observedStatus = 0;
    let observedHeader = '';

    page.on('response', (response) => {
      if (response.request().isNavigationRequest()) {
        observedStatus = response.status();
      }
    });

    await page.route(`${runtimeConfig.baseUrl}/`, async (route) => {
      observedHeader = route.request().headers()['x-test-run'];
      await route.continue({
        headers: {
          ...route.request().headers(),
          'x-test-run': 'network-routing',
        },
      });
    });

    await page.goto('/');

    expect(observedHeader).toBeUndefined();
    expect(observedStatus).toBeGreaterThanOrEqual(200);
    expect(observedStatus).toBeLessThan(400);
  });
});
