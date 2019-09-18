"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("../../index"));
var LoginError_1 = __importDefault(require("../errors/LoginError"));
test("should fail with FAILED reason", function () {
    var ank = new index_1.default();
    expect(ank.Api.createApiKey({
        login: "test",
        password: "test",
        // eslint-disable-next-line @typescript-eslint/camelcase
        long_life_token: false
    })).rejects.toMatchObject(LoginError_1.default);
});
