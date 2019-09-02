import * as endpoints from '../endpoints';
import Request, { Headers } from '../Request';

export type CreateApiKeyRequest = {
    login: string;
    password: string;
    long_life_token?: boolean;
}

export default class Api extends Request {
    public createApiKey(params: CreateApiKeyRequest, headers: Headers) {
        const endpoint = endpoints.EP_CREATE_API_KEY;
        if (params.long_life_token === undefined) {
            params.long_life_token = false;
        }
        this.init('POST', endpoint).addHeaders(headers).run();
        // TODO: missing parameters.
    }
}