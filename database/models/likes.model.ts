import mongoose, { model, Schema, Types } from "mongoose";
import { references } from "../../src/utils/common/enum";

const likeSchema = new Schema(
  {
    likedBy: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required:true
    },
    likeOn: {
      type:  mongoose.Schema.Types.ObjectId,
      refPath: "model",
      // required:true
    },
    model: {
      type: String,
      enum: Object.values(references),
      required:true
    },
  },
  {
    timestamps: { updatedAt: false },
    versionKey: false,
  }
);

export const Like = model("Like", likeSchema);


