import * as endpoints from "../endpoints";
import Request from "../Request";
import { CreateGuestRequest, CreateGuestResponse } from "../types/CreateGuest";
import { CreateTokenRequest, CreateTokenResponse } from "../types/CreateToken";
import {
  ValidateGuestRequest,
  ValidateGuestResponse
} from "../types/ValidateGuest";

export default class Account extends Request {
  public async createGuest(params: CreateGuestRequest) {
    const response = await this.init("GET", endpoints.EP_CREATE_GUEST)
      .asJson()
      .addParams(params)
      .run<CreateGuestResponse>();
    response.body.password = response.headers["x-password"];
    return response.body;
  }

  public async validateGuest(params: ValidateGuestRequest) {
    const response = await this.init("POST", endpoints.EP_VALIDATE_GUEST)
      .addParams(params)
      .run<ValidateGuestResponse>();
    return response.body;
  }

  public async createToken(params: CreateTokenRequest, haapiKey: string) {
    const response = await this.init("GET", endpoints.EP_CREATE_TOKEN)
      .asJson()
      .addParams(params)
      .addHeader("apikey", haapiKey)
      .run<CreateTokenResponse>();
    return response.body;
  }
}
