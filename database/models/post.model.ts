import  { model, Schema, Types } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    caption: {
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
    image: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: { updatedAt: false },
    versionKey: false,
  }
);

export const Post = model("Post", postSchema);
