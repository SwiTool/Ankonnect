import { CreateGuestErrorKey } from "../types/CreateGuest";

export default class GuestError extends Error {}

export type GuestErrorBody = {
  key: CreateGuestErrorKey;
};
