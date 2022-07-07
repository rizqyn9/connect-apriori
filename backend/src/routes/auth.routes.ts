import express from "express"
import User from "../../models/User.model.js"
import responses from "../../utils/responses.js"
import jose from "jose"

const app = express.Router()

app.post("/signup", async (req, res) => {
  try {
    // const valid_keys = ["email", "password", "name"]

    // required fields
    // for (const key of valid_keys) {
    //   if (!req.body[key])
    //     return responses.fail(res, (message = `${key} is required`))
    // }

    //Destruct
    const { name, email, password } = req.body

    // Check existing email
    if (await User.exists({ email }))
      return responses.fail(res, "email", "Email exist")

    // Create new User
    await User.create({ name, email, password }).then((data) => {
      return responses.success(res, { name, email })
    })
  } catch (error) {
    return responses.error(res, error)
  }
})

app.post("/signin", async (req, res) => {
  try {
    // Destruct

    // const { email, password } = req.body

    const payload = new jose.SignJWT({ "urn:example:claim": true })
      .setProtectedHeader({ alg: "ES256" })
      .setIssuedAt()
      .setIssuer("urn:example:issuer")
      .setAudience("urn:example:audience")
      .setExpirationTime("2h")

    res.json({
      payload,
    })
    // Get User
    // await User.findOne({ email }).then((data) => {
    //   if (data) {
    // let payload = jwt.sign(
    //   { email: data.email, id: data._id },
    //   process.env.SECRET_TOKEN
    // )
    // return responses.success(res, {
    //   token: payload,
    //   isAuth: true,
    //   user: { email: data.email, name: data.name, isAdmin: data.isAdmin },
    // })
    //   }
    // })
  } catch (error) {
    return responses.error(res, error)
  }
})

app.post("/validate", (req, res) => {
  try {
    // return jwt.verify(
    //   req.body.token,
    //   process.env.SECRET_TOKEN,
    //   (err, decoded) => {
    //     if (err) throw new Error("Token not valid")
    //     return User.findById(decoded.id).then((data) => {
    //       if (data) {
    //         return responses.success(res, {
    //           token: req.body.token,
    //           isAuth: true,
    //           user: {
    //             email: data.email,
    //             name: data.name,
    //             isAdmin: data.isAdmin,
    //           },
    //         })
    //       } else throw new Error("Not authenticated")
    //     })
    //   }
    // )
  } catch (error) {
    return responses.error(res, error.message)
  }
})

export default app
