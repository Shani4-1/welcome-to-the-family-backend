const Joi = require("joi");
const createValidator = require("./createValidator.js");

const commentSchema = Joi.object({
    commenter: Joi.string().required(),
    content: Joi.string().required(),
    is_favorite: Joi.boolean().required(),
    memory_id: Joi.number().required(),
});

module.exports = createValidator(commentSchema);