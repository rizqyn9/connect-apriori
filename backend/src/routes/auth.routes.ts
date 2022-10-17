import { Router } from "express"
import jwt from "jsonwebtoken"
import { userController } from "@/controller"

const app = Router()

/* --------------------------- Handle user signup --------------------------- */
app.post("/signup", async (req, res, next) => {
  try {
    const payload = (await userController.create(req.body)).toJSON()
    // @ts-expect-error
    delete payload.password
    res.json({ payload })
  } catch (error) {
    next(error)
  }
})

/* ------------------------------ User sign in ------------------------------ */
app.post("/signin", async (req, res, next) => {
  try {
    const user = (await userController.findByEmail(req.body.email)).toJSON()

    if (user.password != req.body.password) throw new Error("Wrong password")
    const token = jwt.sign({ email: user.email, id: user._id }, "secret")

    // @ts-expect-error
    delete user.password
    return res.json({ token, payload: user })
  } catch (error) {
    next(error)
  }
})

export default app
