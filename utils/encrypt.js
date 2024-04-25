"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJs = require("crypto-js");
exports.default = (value, salt) => {
    return CryptoJs.HmacSHA512(value, salt).toString();
};
//# sourceMappingURL=encrypt.js.map