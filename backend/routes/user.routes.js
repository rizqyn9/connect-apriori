import express from "express"
const app = express.Router()

import User from "../models/User.model.js"
import responses from "../utils/responses.js"

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
