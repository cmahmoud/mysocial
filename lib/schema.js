const Joi = require("joi");

module.exports.register = Joi.object({
    fname: Joi.string().required().min(2).max(50).label("first name"),
    lname: Joi.string().required().min(2).max(50).label("last name"),
    email: Joi.string().email().required().min(6).max(50),
    password: Joi.string().required().min(8).max(50),
});