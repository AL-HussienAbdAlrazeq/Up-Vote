import Joi from "joi";
import { gender } from "../../utils/common/enum";

const signUpValidation = Joi.object({
  userName: Joi.string().min(3).required(),
  email: Joi.string().required(),
  password: Joi.string()
    .pattern(/^[A-Z][A-Za-z0-9]{8,40}$/)
    .message("InValid Password")
    .required(),
  rePassword: Joi.valid(Joi.ref("password")).required(),
  gender: Joi.string()
    .valid(...Object.values(gender))
    .required(),
  age: Joi.number().min(15).max(100).required(),
});

const signInValidation = Joi.object({
  email: Joi.string().required(),
  password: Joi.string()
    .pattern(/^[A-Z][A-Za-z0-9]{8,40}$/)
    .message("InValid Password"),
});

export { signUpValidation, signInValidation };
