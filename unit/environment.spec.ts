import { describe, expect, it } from 'vitest';

import { loadRuntimeConfig } from '../config/environment';

describe('loadRuntimeConfig', () => {
  it('uses safe local defaults', () => {
    const config = loadRuntimeConfig({});

    expect(config.baseUrl).toBe('https://www.va.gov');
    expect(config.apiBaseUrl).toBe('https://www.va.gov');
    expect(config.environment).toBe('local');
    expect(config.headless).toBe(false);
    expect(config.retries).toBe(0);
  });

  it('parses CI execution controls', () => {
    const config = loadRuntimeConfig({
      BASE_URL: 'https://test.example/',
      API_BASE_URL: 'https://api.test.example/',
      CI: 'true',
      ENVIRONMENT: 'test',
      HEADLESS: 'yes',
      WORKERS: '4',
      RETRIES: '3',
    });

    expect(config).toMatchObject({
      baseUrl: 'https://test.example',
      apiBaseUrl: 'https://api.test.example',
      environment: 'test',
      isCi: true,
      headless: true,
      workers: 4,
      retries: 3,
    });
  });

  it('rejects invalid worker values', () => {
    expect(() => loadRuntimeConfig({ WORKERS: 'zero' })).toThrow(/WORKERS/);
  });
});
