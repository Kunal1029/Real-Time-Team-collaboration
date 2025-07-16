import mongoose from "mongoose";
import validator from "validator";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    uid: {
      type: String,
      required: [true, "UID is required"],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name must be at most 50 characters"],
      validate: {
        validator: function (v) {
          return /^[a-zA-Z\s]*$/.test(v); // Only letters and spaces
        },
        message: "Name can only contain letters and spaces",
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Invalid email format"],
    },
    role: {
      type: String,
      enum: ["admin","manager", "member"],
      default: "member",
    },
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
