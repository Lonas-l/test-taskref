import type { Page } from '@playwright/test';
import { elementsInitializations } from './initializations';
import { ClickAndWaitProps } from './types';

export class BasePage {
  protected page: Page;
  readonly baseElements: ReturnType<typeof elementsInitializations>;

  constructor(page: Page) {
    this.page = page;

    this.baseElements = elementsInitializations(page);
  }

  protected clickAndWait = async ({ button, request }: ClickAndWaitProps) => {
    await Promise.all([
      button.click(),
      this.page.waitForResponse(
        (response) =>
          response.url().includes(request.url) &&
          response.status() === request.expectedStatus
      ),
    ]);
  };

  protected goto = async (url: string, ref?: string): Promise<void> =>{
    let finalUrl = url;
    if (ref) {
      const urlObj = new URL(url);
      urlObj.searchParams.append('ref', ref);
      finalUrl = urlObj.toString();
    }
    await this.page.goto(finalUrl);
  }
}
