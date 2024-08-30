"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    content: {
        type: String,
    },
    addedBy: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
    },
    numberOfLikes: {
        type: Number,
        min: 0,
        default: 0
    },
    postId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Post"
    },
}, {
    timestamps: { updatedAt: false },
    versionKey: false,
});
exports.Comment = (0, mongoose_1.model)("Comment", commentSchema);
