import { Schema, model } from "mongoose"
import { UserProps } from "@/types"
import { z } from "zod"

const UserSchema = new Schema<UserProps>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
)

export const userValidator = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(3),
  isAdmin: z.boolean(),
})

export const UserModel = model("Users", UserSchema)
