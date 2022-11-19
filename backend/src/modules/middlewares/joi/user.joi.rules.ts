import Joi from 'joi';

export const passwordRegex = /^(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,}).{8,}$/;

export const body = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(8).pattern(passwordRegex).required(),
}).required().messages({
    'string.empty': '{#label} is required',
    'string.min': '{#label} lenght must be at least {#limit} characters long',
    'string.pattern.base': '{#label} must have at least one number and one uppercase letter'
});
