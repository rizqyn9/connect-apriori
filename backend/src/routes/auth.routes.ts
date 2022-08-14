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
    const { email, password } = req.body

    // Get User by email
    await User.findOne({ email }).then((payload) => {
      if (payload) {
        const { _id, email } = payload
        let token = jwt.sign({ email: email, id: _id }, config.secretToken)
        return res.json({ token, payload })
      }
    })
    // TODO remove res | throw
    // If user not found
    throw new Error("User not found")
  } catch (error) {
    next(error)
  }
})

app.post("/validate", (req, res, next) => {
  try {
    // return jwt.verify(
    //   req.body.token,
    //   process.env.SECRET_TOKEN,
    //   (err, decoded) => {
    //     if (err) throw new Error("Token not valid")
    //     return User.findById(decoded.id).then((data) => {
    //       if (data) {
    //         return responses.success(res, {
    //           token: req.body.token,
    //           isAuth: true,
    //           user: {
    //             email: data.email,
    //             name: data.name,
    //             isAdmin: data.isAdmin,
    //           },
    //         })
    //       } else throw new Error("Not authenticated")
    //     })
    //   }
    // )
    throw new Error(`${req.url} not handled now`)
  } catch (error) {
    next(error)
  }
})

export default app
