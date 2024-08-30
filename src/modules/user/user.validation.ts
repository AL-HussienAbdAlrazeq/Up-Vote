import Joi from "joi";
import { gender, systemRoles } from "../../utils/common/enum";

const addUserValidation = Joi.object({
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

const updateUserValidation = Joi.object({
  userName: Joi.string().min(3),
  email: Joi.string(),
  password: Joi.string()
    .pattern(/^[A-Z][A-Za-z0-9]{8,40}$/)
    .message("InValid Password"),
  gender: Joi.string().valid(...Object.values(gender)),
  age: Joi.number().min(15).max(100),
  role: Joi.string().valid(...Object.values(systemRoles)),
  id: Joi.string().hex().length(24).required(),
});

export { addUserValidation, updateUserValidation };
