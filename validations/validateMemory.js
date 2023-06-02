const Joi = require("joi");
const createValidator = require("./createValidator.js");

const memorySchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    description: Joi.string().required(),
    year: Joi.number().required(),
    is_favorite: Joi.boolean().required(),
});

module.exports = createValidator(memorySchema);