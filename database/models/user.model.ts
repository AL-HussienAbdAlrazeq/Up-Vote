import bcrypt from "bcrypt";
import mongoose, { Document, model, Query, Schema } from "mongoose";
import { gender, status, systemRoles } from "../../src/utils/common/enum";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 15,
      max: 100,
    },
    gender: {
      type: String,
      enum: Object.values(gender),
      default: gender.MALE,
    },
    verifyEmail: {
      type: Boolean,
      default: false,
    },
    role: {
      type:String,
      enum:Object.values(systemRoles),
      default:systemRoles.USER,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: Object.values(status),
      default: status.OFFLINE,
    },
    passwordChangedAt: Date,
  },
  {
    timestamps: { updatedAt: false },
    versionKey: false,
  }
);

userSchema.pre('save',function(){
  this.password = bcrypt.hashSync(this.password , 8)
})




export const User = mongoose.model("User", userSchema);
