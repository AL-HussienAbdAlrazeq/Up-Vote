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
exports.signIn = exports.verifyAccount = exports.signUp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../../../database/models/user.model");
const catchError_1 = require("../../middleware/catchError");
const email_1 = require("../../email/email");
const AppError_1 = require("../../utils/AppError");
const messages_1 = require("../../utils/common/messages");
const enum_1 = require("../../utils/common/enum");
const signUp = (0, catchError_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.insertMany(req.body);
    (0, email_1.sendEmail)(req.body.email);
    user[0].password = undefined;
    res.status(200).json({ message: messages_1.message.user.createUser, user });
}));
exports.signUp = signUp;
const verifyAccount = (0, catchError_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    const decode = jsonwebtoken_1.default.verify(token, "my-secret-key", (err, decode) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return next(new AppError_1.AppError(err, 401));
        }
        else {
            const user = yield user_model_1.User.findOneAndUpdate({ email: decode.email }, { verifyEmail: true });
            res.json({ message: messages_1.message.user.verifyAccount, success: true });
        }
    }));
}));
exports.verifyAccount = verifyAccount;
const signIn = (0, catchError_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const userExists = yield user_model_1.User.findOne({ email });
    if (!userExists) {
        return next(new AppError_1.AppError(messages_1.message.user.invalidCredentials, 401));
    }
    let match = bcrypt_1.default.compareSync(password, userExists.password);
    if (!match) {
        return next(new AppError_1.AppError(messages_1.message.user.invalidCredentials, 401));
    }
    userExists.status = enum_1.status.ONLINE;
    yield userExists.save();
    const token = jsonwebtoken_1.default.sign({ userId: userExists.id, role: userExists.role }, "my-secret-key");
    res.status(200).json({
        message: messages_1.message.user.signInSuccessfully,
        success: true,
        data: token,
    });
}));
exports.signIn = signIn;
