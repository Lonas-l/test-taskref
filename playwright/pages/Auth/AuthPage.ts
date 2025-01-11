import type { Page } from '@playwright/test';
import { BasePage } from '../Base/BasePage';
import { elementsInitializations } from './initializations';
import {LoginProps, RegistrationProps} from "./types";
import {LOGIN_REQUEST, REGISTRATION_REQUEST} from "../../constants/requestData";

export class AuthPage extends BasePage {
  readonly elements: ReturnType<typeof elementsInitializations>;

  constructor(page: Page) {
    super(page);

    this.elements = elementsInitializations(page);
  }

  public open = async (ref?: string): Promise<void> => {
    await this.goto(process.env.VITE_FRONT_END_URL, ref);
  }

  public submitAuthForm = async (type: 'login' | 'registration'): Promise<void> => {
    await this.clickAndWait({
        button: this.baseElements.submitBtn,
        request: type === 'login' ? LOGIN_REQUEST : REGISTRATION_REQUEST
    })
  }

  public login = async ({name, password}: LoginProps): Promise<void> => {
    await this.elements.username.fill(name);
    await this.elements.password.fill(password);
    await this.submitAuthForm('login');
  }

  public registration = async ({name, email, password} : RegistrationProps): Promise<void> => {
    await this.elements.username.fill(name);
    await this.elements.email.fill(email);
    await this.elements.password.fill(password);
    await this.submitAuthForm('registration');
  }

}
