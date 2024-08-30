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
exports.likeOrUnLike = void 0;
const catchError_1 = require("../../middleware/catchError");
const comment_model_1 = require("../../../database/models/comment.model");
const post_model_1 = require("../../../database/models/post.model");
const AppError_1 = require("../../utils/AppError");
const likes_model_1 = require("../../../database/models/likes.model");
const mongoose_1 = __importDefault(require("mongoose"));
exports.likeOrUnLike = (0, catchError_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const modelId = req.params.id;
    const { model } = req.body;
    const userId = req.user._id;
    const modelDB = model.toLowerCase() == "comment" ? comment_model_1.Comment : post_model_1.Post;
    const isModelExist = yield modelDB.findById(modelId);
    if (!isModelExist) {
        return next(new AppError_1.AppError("ID Not Found", 404));
    }
    const isLiked = yield likes_model_1.Like.findOne({ likedBy: userId, likeOn: modelId });
    if (isLiked) {
        yield isLiked.deleteOne();
        isModelExist.numberOfLikes--;
        yield isModelExist.save();
        return res.status(200).json({ message: "Unlike Successfully" });
    }
    const like = yield likes_model_1.Like.create({
        likedBy: new mongoose_1.default.Types.ObjectId(userId),
        likeOn: new mongoose_1.default.Types.ObjectId(modelId),
        model
    });
    isModelExist.numberOfLikes++;
    yield isModelExist.save();
    return res.status(200).json({ message: "Like Created Successfully" });
}));
