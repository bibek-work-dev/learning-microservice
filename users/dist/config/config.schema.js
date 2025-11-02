"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configValidationSchema = void 0;
const Joi = require("joi");
exports.configValidationSchema = Joi.object({
    PORT: Joi.number().default(3000),
    MONGO_URI: Joi.string().required(),
});
//# sourceMappingURL=config.schema.js.map