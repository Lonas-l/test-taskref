import type { Page } from '@playwright/test';
import { BasePage } from '../Base/BasePage';
import { elementsInitializations } from './initializations';

export class ProfilePage extends BasePage {
  readonly elements: ReturnType<typeof elementsInitializations>;

  constructor(page: Page) {
    super(page);

    this.elements = elementsInitializations(page);
  }

  public open = async (ref?: string): Promise<void> => {
    await this.goto(`${process.env.VITE_FRONT_END_URL}/profile`, ref);
  }
}
