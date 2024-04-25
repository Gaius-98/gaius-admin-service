"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiException = void 0;
const common_1 = require("@nestjs/common");
class ApiException extends common_1.HttpException {
    constructor(errorMessage, errorCode, statusCode = common_1.HttpStatus.OK) {
        super(errorMessage, statusCode);
        this.errorMessage = errorMessage;
        this.errorCode = errorCode;
    }
    getErrorCode() {
        return this.errorCode;
    }
    getErrorMessage() {
        return this.errorMessage;
    }
}
exports.ApiException = ApiException;
//# sourceMappingURL=api.exception.js.map