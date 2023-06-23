import { Request, NextFunction, Response } from "express"
import jwt from "jsonwebtoken"

export function verifyToken() {
  return function (req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers
    if (!authorization || !jwt.verify(authorization, "secret"))
      return res.status(501).json({
        msg: "invalid token",
      })
    else {
      const { id, role } = jwt.decode(authorization) as { id: string; role: "admin" | "casheer" }
      req.user = {
        id,
        isAdmin: true,
        role,
      }
    }
    next()
  }
}
