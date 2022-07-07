import { Router } from "express"

const app = Router()

import User from "../models/User.js"
import responses from "../utils/responses"

app.get("/", (req, res) => {
  res.send("user")
})

app.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    User.findById(id.toString()).then((data) => {
      if (data) return responses.success(res, data)
      else return responses.fail(res, "User not found")
    })
  } catch (error) {}
})

export default app
