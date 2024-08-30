import { model, Schema, Types } from "mongoose";

const commentSchema = new Schema(
  {
    content: {
      type: String,
    },
    addedBy: {
      type: Types.ObjectId,
      ref: "User",
    },
    numberOfLikes: {
      type: Number,
      min:0,
      default:0
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref:"Post"
    },
  },
  {
    timestamps: { updatedAt: false },
    versionKey: false,
  }
);

export const Comment = model("Comment", commentSchema);
