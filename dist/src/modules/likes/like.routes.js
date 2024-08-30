"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const like_controller_1 = require("./like.controller");
const likeRouter = (0, express_1.Router)();
likeRouter.post('/:id', (0, auth_1.auth)(), like_controller_1.likeOrUnLike);
exports.default = likeRouter;
