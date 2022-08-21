import { Router } from "express"
import User from "../models/User.js"
import jwt from "jsonwebtoken"
import { config } from "@/lib/config.js"

const app = Router()

/* --------------------------- Handle user signup --------------------------- */
app.post("/signup", async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    // Check existing email
    if (await User.exists({ email })) throw new Error("Email exist")

    // Create new User
    await User.create({ name, email, password }).then((payload) => {
      return res.status(201).json({ msg: "created", payload })
    })
  } catch (error) {
    next(error)
  }
})

/* ------------------------------ User sign in ------------------------------ */
app.post("/signin", async (req, res, next) => {
  try {
    let { email, password } = req.body

    const user = await User.findOne({ email: email })

    if (!user) throw new Error("User not found")

    if (user.password != password) throw new Error("Wrong password")

    let token = jwt.sign({ email: user.email, id: user._id }, config.secretToken)

    return res.json({ token, payload: user })
  } catch (error) {
    next(error)
  }
})

export default app
