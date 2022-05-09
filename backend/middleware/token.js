import jwt from "jsonwebtoken"
import responses from "../utils/responses.js"

export const VerifyToken = (req, res, next) => {
  try {
    if (req.headers["x-access-token"]) {
      jwt.verify(
        req.headers["x-access-token"],
        process.env.SECRET_TOKEN,
        (err, validate) => {
          if (err) throw new Error("Token not valid")
          req.user = validate
          next()
        }
      )
    } else throw new Error("User dont have authorization for this action")
  } catch (error) {
    return responses.fail(res, error.message)
  }
}
