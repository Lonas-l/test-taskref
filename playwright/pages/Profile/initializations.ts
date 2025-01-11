import { Page } from '@playwright/test';

export function elementsInitializations(page: Page) {
  return {
    referralBlock: page.getByTestId('ref-user-box'),
    userName: page.getByTestId('username')
  } as const;
}
