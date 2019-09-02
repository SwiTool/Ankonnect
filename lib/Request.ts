import { exec } from 'child_process';
import { AnkonnectDefOptions } from "..";

type SupportedMethod = 'GET' | 'POST';
export type Headers = Record<string, string>;
export type Body = Record<string, any>;
export type Response = {
    headers: Headers;
    body: Body;
    statusCode: number;
}

export default class Request {
    protected options: AnkonnectDefOptions;
    protected command: string;
    protected params: Record<string, string>;
    protected method: SupportedMethod;

    constructor(options: AnkonnectDefOptions) {
        this.options = options;
        this.command = '';
        this.params = {}
        this.method = 'GET';
    }

    protected init(method: SupportedMethod, endpoint: string): Request {
        this.method = method;
        this.command = `curl --compressed -X ${method} ${this.options.baseUrl}${endpoint}`;
        this.command += ` ${this.getCurlProxyParam()}`;
        this.addHeader('user-agent', this.options.userAgent);
        this.addHeader('accept-language', this.options.lang);
        this.addHeader('accept', 'application/json');
        return this;
    }

    public addHeader(headerName: string, headerValue: string) {
        this.command += ` -H "${headerName}: ${headerValue}"`;
        return this;
    }

    public addHeaders(headers: Headers) {
        for (const headerName in headers) {
            const headerValue = headers[headerName];
            this.addHeader(headerName.toLowerCase(), headerValue);
        }
        return this;
    }

    public addParam(paramName: string, paramValue: any) {
        this.params[paramName] = paramValue;
        return this;
    }

    public addParams(params: Body) {
        for (const paramName in params) {
            const paramValue = params[paramName];
            this.addParam(paramName, paramValue);
        }
        return this;
    }

    public async run(): Promise<Response> {
        if (this.command.indexOf('curl') === -1) throw new Error('You must init first with init method.');
        this.buildParams();
        return new Promise((resolve, reject) => {
            exec(this.command, (err: any, stdout: string) => {
                err ? reject(err) : resolve(this.validateRequest(stdout))
            });
        });
    }

    private buildParams(): void {
        const params = this.serializeParams();
        if (!params.length) return;
        switch (this.method) {
            case 'GET':
                this.command += ` --data ${params}`;
                break;
            case 'POST':
                this.command += ` --data-binary ${params}`;
                break;
        }
    }

    private serializeParams(): string {
        let serialized = '';
        let first = true;
        for (const paramName in this.params) {
            const paramValue = this.params[paramName];
            serialized += (first ? '' : '&') + `${paramName}=${paramValue}`;
            first = false;
        }
        return serialized;
    }

    private validateRequest<K>(stdout: string) {
        let response: Response = {
          headers: {},
          body: {},
          statusCode: 0,
        }
        const stdoutClean = stdout.replace(/(\r\n|\n|\r)/gm, "\n");
        const splitted = stdoutClean.split("\n\n"); // body is separated from headers by 2 \n
        const rawHeaders = splitted[0];
        const rawResp = splitted[1];
        const tmpHeaders = rawHeaders.split("\n");
        const rawStatusCode = tmpHeaders.shift();
        for (const head of tmpHeaders) {
          const tmp = head.split(':');
          response.headers[tmp[0]] = tmp[1] ? tmp[1].trim().toLowerCase() : '';
        }
        if (rawStatusCode) {
            const statusReg = / ([0-9]+ )/.exec(rawStatusCode);
            if (statusReg) {
              response.statusCode = parseInt(statusReg[0].trim());
            }
        }
        try {
          response.body = JSON.parse(rawResp);
        } catch (e) {
          console.error(e);
          throw new Error(rawResp);
        }
        const rb = response.body;
        if (rb.status !== undefined && rb.status > 399 || rb.status < 200) {
          throw new Error(rb.message);
        } if (rb.reason !== undefined || rb.key !== undefined && rb.text !== undefined) {
          throw new Error(rb.key ? rb.key : rb.reason)
        }
        return response;
      }

	protected getCurlProxyParam(): string {
		if (!this.options.proxy) return '';
		const proxy = this.options.proxy;
		let param = `--proxy ${proxy.protocol}//`;
		if (proxy.username) {
			param += `${proxy.username}`;
			if (proxy.password) {
				param += `:${proxy.password}`;
			}
			param += '@';
		}
		param += `${proxy.host}:${proxy.port}`;
		return param;
	}
}