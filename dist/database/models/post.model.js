"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    caption: {
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
    image: {
        type: String,
        // required: true,
    },
}, {
    timestamps: { updatedAt: false },
    versionKey: false,
});
exports.Post = (0, mongoose_1.model)("Post", postSchema);
