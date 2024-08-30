"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_1 = require("../../middleware/validation");
const post_validation_1 = require("./post.validation");
const post_controller_1 = require("./post.controller");
const auth_1 = require("../../middleware/auth");
const postRouter = (0, express_1.Router)();
postRouter.post('/', (0, auth_1.auth)(), (0, validation_1.validation)(post_validation_1.addPostValidation), post_controller_1.addPost);
postRouter.get('/', (0, auth_1.auth)(), post_controller_1.getAllPosts);
postRouter.get('/:id', (0, auth_1.auth)(), post_controller_1.getPost);
postRouter.delete('/:id', (0, auth_1.auth)(), post_controller_1.deletePost);
postRouter.put('/:id', (0, auth_1.auth)(), (0, validation_1.validation)(post_validation_1.updatePostValidation), post_controller_1.updatePost);
exports.default = postRouter;
