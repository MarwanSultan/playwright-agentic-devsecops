import type { Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly primaryNavigation;
  readonly headings;

  constructor(page: Page) {
    this.page = page;
    this.primaryNavigation = page.getByRole('navigation').first();
    this.headings = page.getByRole('heading');
  }

  async title(): Promise<string> {
    return this.page.title();
  }

  async openSearch(): Promise<void> {
    await this.page.getByRole('button', { name: /search/i }).click();
  }
}
