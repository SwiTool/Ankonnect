export type CreateGuestRequest = {
  game: number;
  lang: string;
  captcha_token: string;
};

export type CreateGuestResponse = {
  added_date: string;
  added_ip: string;
  avatar_url: string;
  birth_date: string | null;
  community: string;
  email: string | null;
  gsm: string | null;
  id: number;
  lang: string;
  locked: boolean;
  login: string;
  login_date: string | null;
  login_ip: string;
  nickname: string | null;
  parent_email_status: string | null;
  password: string;
  secure: unknown;
  secure_info: unknown;
  security: unknown[];
  type: "GUEST";
};

export type CreateGuestErrorKey = "restriction_ip" | "ankama_captcha_incorrect";
