export default class LoginError extends Error {}

export type LoginErrorBody = {
  reason: string;
};
