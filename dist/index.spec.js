"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("./index"));
var url_1 = __importDefault(require("url"));
test("should construct without options", function () {
    var ank = new index_1.default();
    var options = ank.getOptions();
    expect(options.baseUrl).toBe("https://haapi.ankama.com/json/Ankama/v2");
    expect(options.lang).toBe("fr");
    expect(options.proxy).toBe(null);
});
test("should construct with options", function () {
    var ank = new index_1.default({
        baseUrl: "http://custom.com",
        lang: "pt",
        userAgent: "test"
    });
    var options = ank.getOptions();
    expect(options.baseUrl).toBe("http://custom.com");
    expect(options.lang).toBe("pt");
    expect(options.userAgent).toBe("test");
    expect(options.proxy).toBe(null);
});
test("should construct with proxy", function () {
    var ank = new index_1.default({
        proxy: "http://test:test@1.1.1.1:80"
    });
    var options = ank.getOptions();
    var _url = new url_1.default.URL("http://test:test@1.1.1.1:80");
    expect(options.proxy).toStrictEqual(_url);
});
