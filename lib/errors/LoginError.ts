import { CreateApiKeyErrorReason } from "../types/CreateApiKey";

export default class LoginError extends Error {}

export type LoginErrorBody = {
  reason: CreateApiKeyErrorReason;
};
