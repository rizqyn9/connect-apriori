import { Router } from "express"
import * as userController from "@/controller/user.controller.js"
import User from "../models/User.js"

const app = Router()

app.get("/", (req, res) => {})

app.get("/admin", async (req, res, next) => {
  try {
    await userController.getAllAdmin().then((payload) => {
      res.json({ payload })
    })
  } catch (error) {
    next(error)
  }
})

app.get("/user", async (req, res, next) => {
  try {
    await userController.getAllUser().then((payload) => {
      res.json({ payload })
    })
  } catch (error) {
    next(error)
  }
})

app.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    User.findById(id).then((payload) => {
      res.json({ payload })
    })
  } catch (error) {}
})

export default app
