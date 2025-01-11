import { RequestDataTypes } from '../types/global.types';

export const LOGIN_REQUEST: RequestDataTypes = {
  url: `${process.env.VITE_BACK_END_URL}/auth/login`,
  method: 'POST',
  expectedStatus: 200,
};


export const REGISTRATION_REQUEST: RequestDataTypes = {
  url: `${process.env.VITE_BACK_END_URL}/auth/registration`,
  method: 'POST',
  expectedStatus: 200,
};
