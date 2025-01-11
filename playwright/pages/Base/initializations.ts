import { Page } from '@playwright/test';

export function elementsInitializations(page: Page) {
  return {
    submitBtn: page.getByTestId('submit'),
  } as const;
}
