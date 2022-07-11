import { Router } from "express"

const app = Router()

import User from "../models/User.js"

app.get("/", (req, res) => {
  res.send("user")
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
