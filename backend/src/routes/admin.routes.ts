import { Router } from "express"
// import responses from "../utils/responses.js"

const app = Router()

app.get("/", (req, res) => {
  res.send("okay")
})

// app.get("/accounts", async (req, res) => {
//   try {
//     User.find().then((val) => {
//       return responses.success(res, val)
//     })
//   } catch (error) {}
// })

export default app
