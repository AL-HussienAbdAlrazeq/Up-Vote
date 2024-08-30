"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInValidation = exports.signUpValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const enum_1 = require("../../utils/common/enum");
const signUpValidation = joi_1.default.object({
    userName: joi_1.default.string().min(3).required(),
    email: joi_1.default.string().required(),
    password: joi_1.default.string()
        .pattern(/^[A-Z][A-Za-z0-9]{8,40}$/)
        .message("InValid Password")
        .required(),
    rePassword: joi_1.default.valid(joi_1.default.ref("password")).required(),
    gender: joi_1.default.string()
        .valid(...Object.values(enum_1.gender))
        .required(),
    age: joi_1.default.number().min(15).max(100).required(),
});
exports.signUpValidation = signUpValidation;
const signInValidation = joi_1.default.object({
    email: joi_1.default.string().required(),
    password: joi_1.default.string()
        .pattern(/^[A-Z][A-Za-z0-9]{8,40}$/)
        .message("InValid Password"),
});
exports.signInValidation = signInValidation;
