import { Request, NextFunction, Response } from "express"
import jwt from "jsonwebtoken"
import { config } from "@/lib/config"

export const VerifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.cookies["c_connect"]) {
      jwt.verify(
        String(req.cookies["c_connect"]),
        config.secretToken,
        (err, validate) => {
          if (err) throw new Error("Token not valid")
          // @ts-ignore
          req.user = validate
          next()
        }
      )
    } else throw new Error("User dont have authorization for this action")
  } catch (error) {
    return res.status(401).json({
      msg: "Token not valid, please login",
    })
  }
}
