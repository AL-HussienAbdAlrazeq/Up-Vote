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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.getUser = exports.updateUser = exports.deleteUser = exports.getAllUsers = void 0;
const catchError_1 = require("../../middleware/catchError");
const user_model_1 = require("../../../database/models/user.model");
const messages_1 = require("../../utils/common/messages");
const AppError_1 = require("../../utils/AppError");
const addUser = (0, catchError_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let userExist = yield user_model_1.User.findOne({ email: req.body.email });
    if (userExist) {
        return next(new AppError_1.AppError(messages_1.message.user.userAlreadyExist, 409));
    }
    const user = new user_model_1.User(req.body);
    yield user.save();
    res.status(201).json({ message: "Success", user });
}));
exports.addUser = addUser;
const getAllUsers = (0, catchError_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find();
    res.status(200).json({ message: "Success", users });
}));
exports.getAllUsers = getAllUsers;
const getUser = (0, catchError_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(req.params.id);
    user || next(new AppError_1.AppError("User Not Found", 404));
    !user || res.status(200).json({ message: "Success", user });
}));
exports.getUser = getUser;
const deleteUser = (0, catchError_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.findByIdAndDelete(req.params.id);
    if (!users) {
        return next(new AppError_1.AppError(messages_1.message.user.userNotFound, 404));
    }
    res.status(200).json({ message: messages_1.message.user.deleteUser, users });
}));
exports.deleteUser = deleteUser;
const updateUser = (0, catchError_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    if (!users) {
        return next(new AppError_1.AppError(messages_1.message.user.userNotFound, 404));
    }
    res.status(200).json({ message: messages_1.message.user.updateUser });
}));
exports.updateUser = updateUser;
