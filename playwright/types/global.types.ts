export interface RequestDataTypes {
  url: string;
  method: 'POST' | 'GET' | 'PATCH' | 'PUT' | 'DELETE';
  expectedStatus: number;
}
