"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const checkEmail_1 = require("../../middleware/checkEmail");
const validation_1 = require("../../middleware/validation");
const auth_validation_1 = require("./auth.validation");
const authRouter = (0, express_1.Router)();
authRouter.post('/signup', (0, validation_1.validation)(auth_validation_1.signUpValidation), checkEmail_1.checkEmail, auth_controller_1.signUp);
authRouter.get('/verify-account/:token', auth_controller_1.verifyAccount);
authRouter.post('/signin', (0, validation_1.validation)(auth_validation_1.signInValidation), auth_controller_1.signIn);
// authRouter.patch('/change-password' , changeUserPassword)
exports.default = authRouter;
