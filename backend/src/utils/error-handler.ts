import { NextFunction, Request, Response } from "express"
import { ZodError } from "zod"
import { ResponseError } from "./error"

export function errorHandler() {
  return function (err: Error, req: Request, res: Response, next: NextFunction) {
    console.log({ err })
    if (err instanceof ResponseError) {
      const { status, message } = err
      return res.status(status).json({ message })
    }

    if (err instanceof ZodError) return res.status(401).json({ msg: "Bad Request", ctx: err.flatten() })

    if (err instanceof Error) return res.status(400).json({ msg: err.message })

    return res.status(400).json({ msg: err })
  }
}
