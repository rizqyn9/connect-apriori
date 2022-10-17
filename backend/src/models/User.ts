import { Schema, model } from "mongoose"
import { UserProps } from "@/types"

const UserSchema = new Schema<UserProps>(
  {
    name: String,
    email: String,
    password: String,
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
)

export const UserModel = model("Users", UserSchema)
