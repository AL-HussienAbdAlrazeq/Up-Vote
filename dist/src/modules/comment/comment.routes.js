"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_controller_1 = require("./comment.controller");
const auth_1 = require("../../middleware/auth");
const commentRouter = (0, express_1.Router)();
commentRouter.post('/', (0, auth_1.auth)(), comment_controller_1.createComment);
exports.default = commentRouter;
