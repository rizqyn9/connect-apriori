import { Schema, model } from "mongoose"

export type UserProps = {
  name: string
  email: string
  password: string
  isAdmin: boolean
}

const UserSchema = new Schema<UserProps>({
  name: {
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
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
})

export default model("Users", UserSchema)
