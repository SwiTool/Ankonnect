"use strict";
exports.__esModule = true;
var index_1 = require("../../index");
var GenericError_1 = require("../errors/GenericError");
var GuestError_1 = require("../errors/GuestError");
test("createToken should fail", function () {
    var ank = new index_1["default"]();
    expect(ank.Account.createToken({
        game: 18
    }, "123")).rejects.toMatchObject(GenericError_1["default"]);
});
test("createGuest should fail", function () {
    var ank = new index_1["default"]();
    expect(
    // eslint-disable-next-line @typescript-eslint/camelcase
    ank.Account.createGuest({ game: 18, lang: "fr", captcha_token: "" })).rejects.toMatchObject(GuestError_1["default"]);
});
