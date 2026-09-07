import type { Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly primaryNavigation;
  readonly headings;
  readonly mainContent;

  constructor(page: Page) {
    this.page = page;
    this.primaryNavigation = page.getByRole('navigation').first();
    this.headings = page.getByRole('heading');
    this.mainContent = page.getByRole('main');
  }

  async title(): Promise<string> {
    return this.page.title();
  }

  async openSearch(): Promise<void> {
    await this.page.getByRole('button', { name: /search/i }).click();
  }
}
