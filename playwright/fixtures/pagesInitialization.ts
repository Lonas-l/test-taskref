import { test as baseTest } from '@playwright/test';
import { AuthPage } from '../pages/Auth/AuthPage';
import {ProfilePage} from "../pages/Profile/ProfilePage";

export const test = baseTest.extend<{
  authPage: AuthPage;
  profilePage: ProfilePage;

}>({
  authPage: async ({ page }, use) => {
    const authPage: AuthPage = new AuthPage(page);
    await use(authPage);
  },
  profilePage: async ({ page }, use) => {
    const profilePage: ProfilePage = new ProfilePage(page);
    await use(profilePage);
  },

});
