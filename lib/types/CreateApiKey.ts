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
    message?: string;
    meta: unknown[];
    reason?: CreateApiKeyErrorReasons;
    refresh_token: string;
  };
  
  export type CreateApiKeyErrorReasons =
    | "FAILED"
    | "BAN"
    | "BRUTEFORCE"
    | "NOTOKEN"
    | "BLACKLIST"
    | "LOCKED"
    | "DELETED"
    | "OTPTIMEFAILED"
    | "MAILNOVALID"
    | "BETACLOSED"
    | "RESETANKAMA"
    | "SECURITYCARD"
    | "PARTNER"
    | "NOACCOUNT";
  