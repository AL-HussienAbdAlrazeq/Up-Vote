"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostValidation = exports.addPostValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const addPostValidation = joi_1.default.object({
    title: joi_1.default.string().min(5),
    caption: joi_1.default.string(),
    addedBy: joi_1.default.string().hex().length(24),
    numberOfLikes: joi_1.default.number().min(0),
    image: joi_1.default.object({
        fieldname: joi_1.default.string().required(),
        originalname: joi_1.default.string().required(),
        encoding: joi_1.default.string().required(),
        mimetype: joi_1.default.string()
            .valid("image/jpeg", "image/png", "image/gif", "image/jpg"),
        size: joi_1.default.number().max(5242880).required(),
        destination: joi_1.default.string().required(),
        filename: joi_1.default.string().required(),
        path: joi_1.default.string().required(),
    })
});
exports.addPostValidation = addPostValidation;
const updatePostValidation = joi_1.default.object({
    title: joi_1.default.string().min(10),
    caption: joi_1.default.string(),
    addedBy: joi_1.default.string().hex().length(24),
    numberOfLikes: joi_1.default.number().min(0).required(),
    image: joi_1.default.object({
        fieldname: joi_1.default.string().required(),
        originalname: joi_1.default.string().required(),
        encoding: joi_1.default.string().required(),
        mimetype: joi_1.default.string()
            .valid("image/jpeg", "image/png", "image/gif", "image/jpg")
            .required(),
        size: joi_1.default.number().max(5242880).required(),
        destination: joi_1.default.string().required(),
        filename: joi_1.default.string().required(),
        path: joi_1.default.string().required(),
    }).required(),
    id: joi_1.default.string().hex().length(24).required(),
});
exports.updatePostValidation = updatePostValidation;
