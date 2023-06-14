import "express-async-errors"
import { config } from "@/constant/config"
import express, { NextFunction, Request, Response } from "express"
import { ZodError } from "zod"
import bodyParser from "body-parser"
import cors from "cors"
import cookieParser from "cookie-parser"

import { mongoConnect } from "@/lib/mongo"
import routes from "@/routes"

const app = express()

app.use(cors())
app.use(express.static("public"))
app.use(cookieParser())
app.use(bodyParser.json({ limit: "50mb" }))

app.use(routes)

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log({ err })
  if (err instanceof ZodError) return res.status(401).json({ msg: err.flatten().fieldErrors })
  if (err instanceof Error) return res.status(400).json({ msg: err.message })
  else return res.status(400).json({ msg: err })
})

const server = () => app.listen(config.PORT, () => console.log(`Server listening on http://localhost:${config.PORT}`))

mongoConnect().then(server).catch(console.log)
