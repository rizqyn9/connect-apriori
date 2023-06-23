import { Schema, model } from "mongoose"
import { z } from "zod"

const DB_USER = "user"

const user = new Schema(
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
  password: z.string().min(1),
  isAdmin: z.boolean(),
})

export const User = model(DB_USER, user, DB_USER)
