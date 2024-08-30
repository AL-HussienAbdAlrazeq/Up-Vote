import Joi from "joi";
import { gender, systemRoles } from "../../utils/common/enum";

const addPostValidation = Joi.object({
  title: Joi.string().min(5),
  caption: Joi.string(),
  addedBy: Joi.string().hex().length(24),
  numberOfLikes: Joi.number().min(0),
  image: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string()
      .valid("image/jpeg", "image/png", "image/gif", "image/jpg"),
    size: Joi.number().max(5242880).required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
  })
});



const updatePostValidation = Joi.object({
  title: Joi.string().min(10),
  caption: Joi.string(),
  addedBy: Joi.string().hex().length(24),
  numberOfLikes: Joi.number().min(0).required(),
  image: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string()
      .valid("image/jpeg", "image/png", "image/gif", "image/jpg")
      .required(),
    size: Joi.number().max(5242880).required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
  }).required(),
  id: Joi.string().hex().length(24).required(),
});



export { addPostValidation, updatePostValidation };
