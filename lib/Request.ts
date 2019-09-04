import { exec } from "child_process";
import { AnkonnectDefOptions } from "..";

type SupportedMethod = "GET" | "POST";
export type Headers = Record<string, string>;
export type Body = Record<string, string | boolean | number>;
export type Response<T> = {
  headers: Headers;
  body: T;
  statusCode: number;
};

export default class Request {
  protected options: AnkonnectDefOptions;
  protected command: string;
  protected params: Record<string, string | boolean | number>;
  protected qs: Record<string, string | boolean | number>;
  protected method: SupportedMethod;

  constructor(options: AnkonnectDefOptions) {
    this.options = options;
    this.command = "";
    this.params = {};
    this.qs = {};
    this.method = "GET";
  }

  protected init(method: SupportedMethod, endpoint: string): Request {
    this.method = method;
    this.command = `curl --compressed -i -X ${method} ${this.options.baseUrl}${endpoint}`;
    this.command += ` ${this.getCurlProxyParam()}`;
    this.addHeader("user-agent", this.options.userAgent);
    this.addHeader("accept-language", this.options.lang);
    this.addHeader("content-type", "text/plain;charset=UTF-8");
    this.addHeader("accept", "application/json");
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

  public addQuery(paramName: string, paramValue: string | boolean | number) {
    this.qs[paramName] = paramValue;
    return this;
  }

  public addParam(paramName: string, paramValue: string | boolean | number) {
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

  public addQueries(params: Body) {
    for (const paramName in params) {
      const paramValue = params[paramName];
      this.addQuery(paramName, paramValue);
    }
    return this;
  }

  public async run<T>(): Promise<Response<T>> {
    if (this.command.indexOf("curl") === -1)
      throw new Error("You must init first with init method.");
    this.buildParams();
    this.buildQuery();
    console.log(this.command);
    return new Promise((resolve, reject) => {
      exec(this.command, (err, stdout) => {
        err ? reject(err) : resolve(this.validateRequest(stdout));
      });
    });
  }

  private buildParams(): void {
    const params = this.serializeParams();
    if (!params.length) return;
    switch (this.method) {
      case "GET":
        this.command += ` --data "${params}"`;
        break;
      case "POST":
        this.command += ` --data-binary "${params}"`;
        break;
    }
  }

  private buildQuery(): void {
    const query = this.serializeQuery();
    if (!query.length) return;
    switch (this.method) {
      case "GET":
        this.command += ` -G -d "${query}"`;
        break;
      case "POST":
        this.command += ` -d "${query}"`;
        break;
    }
  }

  private serializeQuery(): string {
    let serialized = "";
    let first = true;
    for (const paramName in this.qs) {
      const paramValue = this.qs[paramName];
      serialized += (first ? "" : "&") + `${paramName}=${paramValue}`;
      first = false;
    }
    return serialized;
  }

  private serializeParams(): string {
    let serialized = "";
    let first = true;
    for (const paramName in this.params) {
      const paramValue = this.params[paramName];
      serialized += (first ? "" : "&") + `${paramName}=${paramValue}`;
      first = false;
    }
    return serialized;
  }

  private validateRequest<T>(stdout: string) {
    const headers: Headers = {};
    let statusCode = 0;
    const stdoutClean = stdout.replace(/(\r\n|\n|\r)/gm, "\n");
    const splitted = stdoutClean.split("\n\n"); // body is separated from headers by 2 \n
    const rawHeaders = splitted[0];
    const rawResp = splitted[1];
    const tmpHeaders = rawHeaders.split("\n");
    const rawStatusCode = tmpHeaders.shift();
    for (const head of tmpHeaders) {
      const tmp = head.split(":");
      headers[tmp[0]] = tmp[1] ? tmp[1].trim().toLowerCase() : "";
    }
    if (rawStatusCode) {
      const statusReg = / ([0-9]+ )/.exec(rawStatusCode);
      if (statusReg) {
        statusCode = parseInt(statusReg[0].trim());
      }
    }
    try {
      const response: Response<T> = {
        headers: headers,
        statusCode: statusCode,
        body: JSON.parse(rawResp)
      };
      return response;
    } catch (e) {
      console.error(e);
      throw new Error(rawResp);
    }
  }

  protected getCurlProxyParam(): string {
    if (!this.options.proxy) return "";
    const proxy = this.options.proxy;
    let param = `--proxy ${proxy.protocol}//`;
    if (proxy.username) {
      param += `${proxy.username}`;
      if (proxy.password) {
        param += `:${proxy.password}`;
      }
      param += "@";
    }
    param += `${proxy.host}:${proxy.port}`;
    return param;
  }
}
