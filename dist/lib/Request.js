"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var helpers_1 = require("./helpers");
var GenericError_1 = __importDefault(require("./errors/GenericError"));
var LoginError_1 = __importDefault(require("./errors/LoginError"));
var log_1 = __importDefault(require("./log"));
var Request = /** @class */ (function () {
    function Request(options) {
        this.options = options;
        this.command = "";
        this.params = {};
        this.qs = {};
        this.method = "GET";
        this.endpoint = "";
    }
    Request.prototype.clear = function () {
        this.command = "";
        this.params = {};
        this.qs = {};
        this.method = "GET";
        this.endpoint = "";
    };
    Request.prototype.init = function (method, endpoint) {
        this.method = method;
        this.endpoint = endpoint;
        this.command = "curl --tlsv1.1 -i";
        this.command += " " + this.getCurlProxyParam();
        this.addHeader("user-agent", this.options.userAgent);
        this.addHeader("accept-language", this.options.lang);
        this.addHeader("content-type", "text/plain;charset=UTF-8");
        this.addHeader("accept", "application/json");
        return this;
    };
    Request.prototype.addHeader = function (headerName, headerValue) {
        this.command += " -H \"" + headerName + ": " + headerValue + "\"";
        return this;
    };
    Request.prototype.addHeaders = function (headers) {
        for (var headerName in headers) {
            var headerValue = headers[headerName];
            this.addHeader(headerName.toLowerCase(), headerValue);
        }
        return this;
    };
    Request.prototype.addParam = function (paramName, paramValue) {
        this.params[paramName] = paramValue;
        return this;
    };
    Request.prototype.addParams = function (params) {
        for (var paramName in params) {
            var paramValue = params[paramName];
            this.addParam(paramName, paramValue);
        }
        return this;
    };
    Request.prototype.addQuery = function (paramName, paramValue) {
        this.qs[paramName] = paramValue;
        return this;
    };
    Request.prototype.addQueries = function (params) {
        for (var paramName in params) {
            var paramValue = params[paramName];
            this.addQuery(paramName, paramValue);
        }
        return this;
    };
    Request.prototype.buildUrl = function () {
        this.command += " " + this.options.baseUrl + this.endpoint;
        var first = true;
        for (var qName in this.qs) {
            var qValue = this.qs[qName];
            this.command += "" + (first ? "?" : "&") + qName + "=" + qValue;
            first = false;
        }
    };
    Request.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.command.indexOf("curl") === -1) {
                    throw new Error("You must init first with init method.");
                }
                this.buildParams();
                this.buildUrl();
                log_1.default(this.command);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        child_process_1.exec(_this.command, function (err, stdout) {
                            _this.clear();
                            try {
                                err ? reject(err) : resolve(_this.validateRequest(stdout));
                            }
                            catch (e) {
                                reject(e);
                            }
                        });
                    })];
            });
        });
    };
    Request.prototype.buildParams = function () {
        var dataParam = "";
        switch (this.method) {
            case "GET":
                this.command += " -G";
                dataParam = "--data";
                break;
            case "POST":
                dataParam = "--data-binary";
                break;
            default:
                dataParam = "--data";
        }
        for (var paramName in this.params) {
            var paramValue = this.params[paramName];
            this.command += " " + dataParam + " \"" + paramName + "=" + paramValue + "\"";
        }
    };
    Request.prototype.validateRequest = function (stdout) {
        var headers = {};
        var statusCode = 0;
        var stdoutClean = stdout.replace(/(\r\n|\n|\r)/gm, "\n");
        var splitted = stdoutClean.split("\n\n"); // body is separated from headers by 2 \n
        var rawHeaders = splitted[0];
        var rawResp = splitted[1];
        var tmpHeaders = rawHeaders.split("\n");
        var rawStatusCode = tmpHeaders.shift();
        for (var _i = 0, tmpHeaders_1 = tmpHeaders; _i < tmpHeaders_1.length; _i++) {
            var head = tmpHeaders_1[_i];
            var tmp = head.split(":");
            headers[tmp[0]] = tmp[1] ? tmp[1].trim().toLowerCase() : "";
        }
        if (rawStatusCode) {
            var statusReg = / ([0-9]+ )/.exec(rawStatusCode);
            if (statusReg) {
                statusCode = parseInt(statusReg[0].trim());
            }
        }
        try {
            var response = {
                headers: headers,
                statusCode: statusCode,
                body: JSON.parse(rawResp)
            };
            if (helpers_1.isGenericErrorBody(response.body)) {
                log_1.default(response.statusCode + ": " + response.body.message);
                throw new GenericError_1.default(response.body.message);
            }
            if (helpers_1.isLoginError(response.body)) {
                log_1.default(response.statusCode + ": " + response.body.reason);
                throw new LoginError_1.default(response.body.reason);
            }
            return response;
        }
        catch (e) {
            if (e instanceof SyntaxError) {
                log_1.default("" + rawResp);
                throw new SyntaxError(e.message + ": " + rawResp);
            }
            throw e;
        }
    };
    Request.prototype.getCurlProxyParam = function () {
        if (!this.options.proxy)
            return "";
        var proxy = this.options.proxy;
        var param = "--proxy " + proxy.protocol + "//";
        if (proxy.username) {
            param += "" + proxy.username;
            if (proxy.password) {
                param += ":" + proxy.password;
            }
            param += "@";
        }
        param += proxy.host + ":" + proxy.port;
        return param;
    };
    return Request;
}());
exports.default = Request;
