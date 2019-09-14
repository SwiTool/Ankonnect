"use strict";
exports.__esModule = true;
var url = require("url");
var UserAgent_1 = require("./lib/UserAgent");
var Api_1 = require("./lib/models/Api");
var Account_1 = require("./lib/models/Account");
var Ankonnect = /** @class */ (function () {
    function Ankonnect(options) {
        this.options = {
            baseUrl: "https://haapi.ankama.com/json/Ankama/v2",
            userAgent: UserAgent_1["default"].getRandomUserAgent(),
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
        this.Api = new Api_1["default"](this.options);
        this.Account = new Account_1["default"](this.options);
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
exports["default"] = Ankonnect;
