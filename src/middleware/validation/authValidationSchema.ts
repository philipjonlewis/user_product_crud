const Joi = require("joi").extend(require("@joi/date"));

import {
  uuidValidationSchema,
  uuidValidationSchemaNotRequired,
  stringContentValidationSchema,
  booleanValidationSchema,
  dateValidationSchema,
} from "./commonValidationSchema";

const userNameValidSchema = Joi.string()
  .alphanum()
  .lowercase()
  .trim()
  .min(6)
  .max(32)
  .required();

const emailValidSchema = Joi.string()
  .lowercase()
  .trim()
  .min(3)
  .max(256)
  .email({ minDomainSegments: 2, tlds: { allow: false } })
  .required();

const passwordValidSchema = Joi.string()
  .trim()
  .min(6)
  .max(32)
  .pattern(new RegExp("(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,32}$"))
  .required();

const passwordValidSchemaConfirmation = Joi.string()
  .valid(Joi.ref("password"))
  .required();

const signUpUserDataValidationSchema = Joi.object({
  email: emailValidSchema,
  password: passwordValidSchema,
  passwordConfirmation: passwordValidSchemaConfirmation,
});

const DeleteUserDataValidationSchema = Joi.object({
  email: emailValidSchema,
  password: passwordValidSchema,
  passwordConfirmation: passwordValidSchemaConfirmation,
});

const LogInUserDataValidationSchema = Joi.object({
  email: emailValidSchema,
  password: passwordValidSchema,
});

const EditUserEmailValidationSchema = Joi.object({
  email: Joi.string()
    .lowercase()
    .trim()
    .min(3)
    .max(256)
    .email({ minDomainSegments: 2, tlds: { allow: false } }),
  newEmail: Joi.string()
    .lowercase()
    .trim()
    .min(3)
    .max(256)
    .email({ minDomainSegments: 2, tlds: { allow: false } }),

  password: passwordValidSchema,
});
const EditUserPasswordValidationSchema = Joi.object({
  email: Joi.string()
    .lowercase()
    .trim()
    .min(3)
    .max(256)
    .email({ minDomainSegments: 2, tlds: { allow: false } }),

  password: passwordValidSchema,
  newPassword: passwordValidSchema,
});

export {
  signUpUserDataValidationSchema,
  LogInUserDataValidationSchema,
  EditUserEmailValidationSchema,
  EditUserPasswordValidationSchema,
  DeleteUserDataValidationSchema,
};
