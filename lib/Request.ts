import { exec } from "child_process";
import { AnkonnectDefOptions } from "..";
import { isGenericErrorBody, isLoginError } from "./helpers";
import GenericError from "./errors/GenericError";
import LoginError from "./errors/LoginError";
import debug from "./log";

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
  protected endpoint: string;
  protected returnAsJson: boolean;

  constructor(options: AnkonnectDefOptions) {
    this.options = options;
    this.command = "";
    this.params = {};
    this.qs = {};
    this.method = "GET";
    this.endpoint = "";
    this.returnAsJson = false;
  }

  private clear() {
    this.command = "";
    this.params = {};
    this.qs = {};
    this.method = "GET";
    this.endpoint = "";
    this.returnAsJson = false;
  }

  protected init(method: SupportedMethod, endpoint: string): Request {
    this.method = method;
    this.endpoint = endpoint;
    this.command = `curl --tlsv1.1 -i`;
    this.command += ` ${this.getCurlProxyParam()}`;
    this.addHeader("accept-language", this.options.lang);
    this.addHeader("user-agent", this.options.userAgent);
    //this.addHeader("content-type", "text/plain;charset=UTF-8");
    //this.addHeader("accept", "application/json");
    return this;
  }

  public asJson() {
    this.returnAsJson = true;
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

  public addQuery(paramName: string, paramValue: string | boolean | number) {
    this.qs[paramName] = paramValue;
    return this;
  }

  public addQueries(params: Body) {
    for (const paramName in params) {
      const paramValue = params[paramName];
      this.addQuery(paramName, paramValue);
    }
    return this;
  }

  public buildUrl() {
    this.command += ` ${this.options.baseUrl}${this.endpoint}`;
    let first = true;
    for (const qName in this.qs) {
      const qValue = this.qs[qName];
      this.command += `${first ? "?" : "&"}${qName}=${qValue}`;
      first = false;
    }
  }

  public async run<T>(): Promise<Response<T>> {
    if (this.command.indexOf("curl") === -1) {
      throw new Error("You must init first with init method.");
    }
    this.buildParams();
    this.buildUrl();
    debug(this.command);
    return new Promise((resolve, reject) => {
      exec(this.command, (err, stdout) => {
        this.clear();
        try {
          err ? reject(err) : resolve(this.validateRequest(stdout));
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  private buildParams(): void {
    let dataParam = "";
    switch (this.method) {
      case "GET":
        this.command += ` -G`;
        dataParam = "--data";
        break;
      case "POST":
        dataParam = "--data-binary";
        break;
      default:
        dataParam = "--data";
    }
    for (const paramName in this.params) {
      const paramValue = this.params[paramName];
      this.command += ` ${dataParam} "${paramName}=${paramValue}"`;
    }
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
        body: this.returnAsJson ? JSON.parse(rawResp) : rawResp
      };
      if (isGenericErrorBody(response.body)) {
        debug(`${response.statusCode}: ${response.body.message}`);
        throw new GenericError(response.body.message);
      }
      if (isLoginError(response.body)) {
        debug(`${response.statusCode}: ${response.body.reason}`);
        throw new LoginError(response.body.reason);
      }
      return response;
    } catch (e) {
      if (e instanceof SyntaxError) {
        debug(`${rawResp}`);
        throw new SyntaxError(`${e.message}: ${rawResp}`);
      }
      throw e;
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
