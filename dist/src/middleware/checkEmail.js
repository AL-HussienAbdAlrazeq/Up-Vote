"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEmail = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../../database/models/user.model");
const AppError_1 = require("../utils/AppError");
const messages_1 = require("../utils/common/messages");
const checkEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const isFound = yield user_model_1.User.findOne({ email: req.body.email });
    if (isFound) {
        return next(new AppError_1.AppError(messages_1.message.user.userAlreadyExist, 409));
    }
    req.body.password = bcrypt_1.default.hashSync(req.body.password, 8);
    next();
});
exports.checkEmail = checkEmail;
