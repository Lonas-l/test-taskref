import { test } from '../../fixtures/pagesInitialization';
import { expect } from '@playwright/test';
import {randomEmail, randomName, randomPassword} from "../../helper/dataGeneration";

test.describe('Positive Registration Test', () => {

  test.beforeEach(async ({ authPage }) => {
    await authPage.open(process.env.E2E_USER_REF);
  });

  test('Check successful referral', async ({ authPage, profilePage }) => {
    const registrationData = {
      name: randomName(),
      email: randomEmail(),
      password: randomPassword()
    }

    await authPage.registration(registrationData);
    await authPage.login({ name: process.env.E2E_USER_NAME, password: process.env.E2E_USER_PASSWORD });

    await expect(profilePage.elements.referralBlock.last()).toContainText(registrationData.email);
    await expect(profilePage.elements.referralBlock.last()).toContainText(registrationData.name);
  });
})