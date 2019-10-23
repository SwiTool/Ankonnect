import * as endpoints from "../endpoints";
import Request from "../Request";
import { CreateGuestRequest, CreateGuestResponse } from "../types/CreateGuest";
import { CreateTokenRequest, CreateTokenResponse } from "../types/CreateToken";
import { RegisterOpenResponse } from "../types/RegisterOpen";
import {
  ValidateGuestRequest,
  ValidateGuestResponse
} from "../types/ValidateGuest";

export default class Account extends Request {
  public async createGuest(params: CreateGuestRequest) {
    const response = await this.init("GET", endpoints.EP_CREATE_GUEST)
      .addParams(params)
      .run<CreateGuestResponse>();
    response.body.password = response.headers["x-password"];
    return response.body;
  }

  public async validateGuest(params: ValidateGuestRequest) {
    try {
      const response = await this.init("GET", endpoints.EP_VALIDATE_GUEST)
        .addParams(params)
        .run<ValidateGuestResponse>();
      return response.body;
    } catch (e) {
      if (!(e instanceof SyntaxError)) {
        throw e;
      }
    }
    return {};
  }

  public async createToken(params: CreateTokenRequest, haapiKey: string) {
    const response = await this.init("GET", endpoints.EP_CREATE_TOKEN)
      .addParams(params)
      .addHeader("apikey", haapiKey)
      .run<CreateTokenResponse>();
    return response.body;
  }

  public async registerOpenRequest() {
    const response = await this.init("GET", endpoints.EP_REGISTER_OPEN_REQUEST)
      .addParam("lang", this.options.lang)
      .run<RegisterOpenResponse>();
    return response.body;
  }
}
