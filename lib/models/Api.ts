import * as endpoints from "../endpoints";
import Request from "../Request";
import {
  CreateApiKeyRequest,
  CreateApiKeyResponse
} from "../types/CreateApiKey";

export default class Api extends Request {
  public async createApiKey(params: CreateApiKeyRequest) {
    const response = await this.init("POST", endpoints.EP_CREATE_API_KEY)
      .asJson()
      .addParams(params)
      .run<CreateApiKeyResponse>();
    return response.body;
  }
}
