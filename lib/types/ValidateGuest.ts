export type ValidateGuestRequest = {
  lang: string;
  guestAccountId: number;
  guestLogin: string;
  guestPassword: string;
  login: string;
  password: string;
  email: string;
  parentEmail: string;
  birthDateTimestamp: number;
  nickname: string;
};

export type ValidateGuestResponse = {
  _headers: {
    duration: number;
  };
};
