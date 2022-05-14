import jwt from "jsonwebtoken"
import responses from "../utils/responses.js"

export const VerifyToken = (req, res, next) => {
  try {
    if (req.cookies["c_connect"]) {
      jwt.verify(
        req.cookies["c_connect"],
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
