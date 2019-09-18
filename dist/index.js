"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var url = __importStar(require("url"));
var UserAgent_1 = __importDefault(require("./lib/UserAgent"));
var Api_1 = __importDefault(require("./lib/models/Api"));
var Account_1 = __importDefault(require("./lib/models/Account"));
var Ankonnect = /** @class */ (function () {
    function Ankonnect(options) {
        this.options = {
            baseUrl: "https://haapi.ankama.com/json/Ankama/v2",
            userAgent: UserAgent_1.default.getRandomUserAgent(),
            lang: "fr",
            proxy: null
        };
        var opts = {
            baseUrl: options && options.baseUrl ? options.baseUrl : this.options.baseUrl,
            userAgent: options && options.userAgent
                ? options.userAgent
                : this.options.userAgent,
            lang: options && options.lang ? options.lang : this.options.lang,
            proxy: this.initProxy(options ? options.proxy : null)
        };
        this.options = opts;
        this.Api = new Api_1.default(this.options);
        this.Account = new Account_1.default(this.options);
    }
    Ankonnect.prototype.initProxy = function (proxy) {
        if (typeof proxy === "string") {
            return new url.URL(proxy);
        }
        else if (proxy instanceof url.URL) {
            return proxy;
        }
        return null;
    };
    Ankonnect.prototype.getOptions = function () {
        return this.options;
    };
    return Ankonnect;
}());
exports.default = Ankonnect;
