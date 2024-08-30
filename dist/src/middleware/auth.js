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
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = require("../utils/AppError");
const messages_1 = require("../utils/common/messages");
const user_model_1 = require("../../database/models/user.model");
const enum_1 = require("../utils/common/enum");
const catchError_1 = require("./catchError");
const auth = (roles = Object.values(enum_1.systemRoles)) => {
    return (0, catchError_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { token } = req.headers;
        if (!token) {
            return next(new AppError_1.AppError("Token is required", 409));
        }
        const decode = jsonwebtoken_1.default.verify(token, "my-secret-key");
        if (!decode.userId || !decode) {
            return next(new AppError_1.AppError(messages_1.message.token.invalidPayload, 400));
        }
        const authUser = yield user_model_1.User.findById(decode.userId);
        if (!authUser) {
            return next(new AppError_1.AppError("Please Signup first", 404));
        }
        if (!roles.includes(authUser.role)) {
            return next(new AppError_1.AppError(messages_1.message.user.unAuthorization, 401));
        }
        req.user = authUser;
        next();
    }));
};
exports.auth = auth;
