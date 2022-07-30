import express, { NextFunction, Request, Response } from "express"
import bodyParser from "body-parser"
import cors from "cors"
import cookieParser from "cookie-parser"

import { MongoConnect } from "./lib/mongo"
import { config } from "@/lib/config"
import Routes from "./routes"
import { ZodError } from "zod"

const app = express()

app.use(cors())
app.use(express.static("public"))

app.use(cookieParser())
// application/json
app.use(bodyParser.json({ limit: "50mb" }))

app.use((req, res, next) => {
  next()
})

app.use(Routes)

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    return res.json(err.flatten().fieldErrors)
  }
  console.log(err)
  if (err instanceof Error) {
    res.status(400)
    res.json({ err: err.message })
  } else {
    res.status(500)
    res.json({ err })
  }
})

MongoConnect()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server listening on http://localhost:${config.port}`)
    })
  })
  .catch((e) => {
    console.log(e)
  })
