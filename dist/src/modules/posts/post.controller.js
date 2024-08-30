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
exports.addPost = exports.getPost = exports.updatePost = exports.deletePost = exports.getAllPosts = void 0;
const catchError_1 = require("../../middleware/catchError");
const AppError_1 = require("../../utils/AppError");
const post_model_1 = require("../../../database/models/post.model");
const addPost = (0, catchError_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const post = new post_model_1.Post(req.body);
    yield (yield post).save();
    res.status(201).json({ message: "Success", post });
}));
exports.addPost = addPost;
const getAllPosts = (0, catchError_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_model_1.Post.find().populate('addedBy');
    res.status(200).json({ message: "Success", post });
}));
exports.getAllPosts = getAllPosts;
const getPost = (0, catchError_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_model_1.Post.findById(req.params.id).populate('addedBy');
    post || next(new AppError_1.AppError("Post Not Found", 404));
    !post || res.status(200).json({ message: "Success", post });
}));
exports.getPost = getPost;
const deletePost = (0, catchError_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield post_model_1.Post.findByIdAndDelete(req.params.id);
    if (!posts) {
        return next(new AppError_1.AppError("Post Not Found", 404));
    }
    res.status(200).json({ message: "Post Deleted Successfully", posts });
}));
exports.deletePost = deletePost;
const updatePost = (0, catchError_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield post_model_1.Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!posts) {
        return next(new AppError_1.AppError("Post Not Found", 404));
    }
    res.status(200).json({ message: "Post Updated Successfully", posts });
}));
exports.updatePost = updatePost;
