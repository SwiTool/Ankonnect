import * as endpoints from "../endpoints";
import Request from "../Request";
import {
  CreateApiKeyRequest,
  CreateApiKeyResponse
} from "../types/CreateApiKey";
import { CreateTokenRequest, CreateTokenResponse } from "../types/CreateToken";

export default class Api extends Request {
  public async createApiKey(params: CreateApiKeyRequest) {
    const response = await this.init("POST", endpoints.EP_CREATE_API_KEY)
      .addParams(params)
      .run<CreateApiKeyResponse>();
    if (response.statusCode !== 200) {
      throw new Error(response.body.reason);
    }
    return response;
  }

  public async createToken(params: CreateTokenRequest, haapiKey: string) {
    const response = await this.init("GET", endpoints.EP_CREATE_TOKEN)
      .addQueries(params)
      .addHeader("apikey", haapiKey)
      .run<CreateTokenResponse>();
    if (response.statusCode !== 200) {
      console.error(response);
      // TODO: don't know what is returned here
      throw new Error("UNKOWN ERROR");
    }
    return response;
  }
}
