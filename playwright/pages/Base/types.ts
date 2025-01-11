import { Locator } from '@playwright/test';
import { RequestDataTypes } from '../../types/global.types';

export interface ClickAndWaitProps {
  button: Locator;
  request: RequestDataTypes;
}
