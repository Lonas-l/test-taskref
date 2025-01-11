import { Page } from '@playwright/test';

export function elementsInitializations(page: Page) {
  return {
    username: page.locator('[name=username]'),
    email: page.locator('[name=email]'),
    password: page.locator('[name=password]'),
  } as const;
}
