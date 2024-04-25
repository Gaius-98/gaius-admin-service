"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDictDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_dict_dto_1 = require("./create-dict.dto");
class UpdateDictDto extends (0, mapped_types_1.PartialType)(create_dict_dto_1.CreateDictDto) {
}
exports.UpdateDictDto = UpdateDictDto;
//# sourceMappingURL=update-dict.dto.js.map