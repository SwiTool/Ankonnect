"use strict";
exports.__esModule = true;
var index_1 = require("../../index");
var LoginError_1 = require("../errors/LoginError");
test("should fail with FAILED reason", function () {
    var ank = new index_1["default"]();
    expect(ank.Api.createApiKey({
        login: "test",
        password: "test",
        // eslint-disable-next-line @typescript-eslint/camelcase
        long_life_token: false
    })).rejects.toMatchObject(LoginError_1["default"]);
});
