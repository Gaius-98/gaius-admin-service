"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skip = void 0;
const common_1 = require("@nestjs/common");
const Skip = (...args) => (0, common_1.SetMetadata)('skip', args);
exports.Skip = Skip;
//# sourceMappingURL=skip.decorator.js.map