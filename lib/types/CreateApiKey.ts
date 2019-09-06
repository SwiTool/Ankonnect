export type CreateApiKeyRequest = {
  login: string;
  password: string;
  long_life_token: boolean;
};

export type CreateApiKeyResponse = {
  access: unknown[];
  account_id: number;
  added_date: string;
  data: {
    country: string;
    currency: string;
  };
  expiration_date: string;
  ip: string;
  key: string;
  meta: unknown[];
  refresh_token: string;
};

export enum CreateApiKeyErrorReasons {
  "BAD_VERSION" = 1,
  "WRONG_CREDENTIALS",
  "BANNED",
  "KICKED",
  "IN_MAINTENANCE",
  "TOO_MANY_ON_IP",
  "TIME_OUT",
  "BAD_IPRANGE",
  "CREDENTIALS_RESET",
  "EMAIL_UNVALIDATED",
  "OTP_TIMEOUT",
  "SERVICE_UNAVAILABLE",
  "UNKNOWN_AUTH_ERROR",
  "SPARE"
}
