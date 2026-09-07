import type { APIRequestContext, APIResponse } from '@playwright/test';

export class PublicSiteClient {
  constructor(private readonly request: APIRequestContext) {}

  async get(path: string): Promise<APIResponse> {
    if (!path.startsWith('/')) {
      throw new Error(`API paths must start with '/', received: "${path}"`);
    }

    return this.request.get(path);
  }
}
