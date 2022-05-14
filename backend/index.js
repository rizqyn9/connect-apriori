import dotenv from "dotenv"
dotenv.config()

import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import cookieParser from "cookie-parser"
import { MongoConnect } from "./utils/mongoConnect.js"
import Routes from "./routes/index.routes.js"

const app = express()

app.use(cors())
app.use(express.static("public"))

app.use(cookieParser())
// application/json
app.use(bodyParser.json({ limit: "50mb" }))

app.use((req, res, next) => {
  next()
})

app.use(cors({ credentials: true, origin: "http://localhost:3000" }), Routes)

app.use("*", (req, res) => {
  res.send("Routes not found")
})

const PORT = process.env.PORT || 5000

// Wait until DB connected
MongoConnect(process.env.MONGO)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`)
    })
  })
  .catch((e) => {
    console.log(e)
  })
