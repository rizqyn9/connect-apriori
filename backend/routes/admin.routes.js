import express from "express"
import User from "../models/User.model.js"
import responses from "../utils/responses.js"

const app = express.Router()
app.get("/", (req, res) => {
  res.send("okay")
})

app.get("/accounts", async (req, res) => {
  try {
    User.find().then((val) => {
      return responses.success(res, val)
    })
  } catch (error) {}
})

export default app
