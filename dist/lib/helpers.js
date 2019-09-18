"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isGenericErrorBody(val) {
    return "message" in val && "status" in val;
}
exports.isGenericErrorBody = isGenericErrorBody;
function isLoginError(val) {
    return "reason" in val;
}
exports.isLoginError = isLoginError;
