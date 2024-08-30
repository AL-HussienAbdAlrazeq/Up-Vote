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
exports.createComment = void 0;
const catchError_1 = require("../../middleware/catchError");
const post_model_1 = require("../../../database/models/post.model");
const AppError_1 = require("../../utils/AppError");
const comment_model_1 = require("../../../database/models/comment.model");
const messages_1 = require("../../utils/common/messages");
const createComment = (0, catchError_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, postId } = req.body;
    const { _id } = req.user;
    const { language } = req.query;
    const post = yield post_model_1.Post.findById(postId);
    if (!post)
        return next(new AppError_1.AppError(messages_1.message.arabic.PostNotFound, 404));
    const comment = yield comment_model_1.Comment.create({ content, postId, addedBy: _id });
    res.status(200).json({ message: "Comment added successfully", comment });
}));
exports.createComment = createComment;
