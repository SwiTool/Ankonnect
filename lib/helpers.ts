import { GenericErrorBody } from "./errors/GenericError";
import { LoginErrorBody } from "./errors/LoginError";

export function isGenericErrorBody(val: any): val is GenericErrorBody {
  return "message" in val && "status" in val;
}

export function isLoginError(val: any): val is LoginErrorBody {
  return "reason" in val;
}
