import express from "express"
import Customer from "../models/Customer.model.js"
import responses from "../utils/responses.js"
import { isValidKeyRequest } from "../utils/index.js"
import mongoose from "mongoose"

const app = express.Router()

/**
 * Get all customer if id empty
 * Get specified customer if id is fullfilled
 */
app.get("/", async (req, res) => {
  const id = req.body.id

  const query = id && mongoose.isValidObjectId(id) ? { _id: id } : {}

  return await Customer.find(query)
    .then((data) => {
      responses.success(res, data)
    })
    .catch((err) => {
      responses.error(res, err)
    })
})

app.post("/new", async (req, res) => {
  try {
    isValidKeyRequest(["name", "id_customer"], req, res)

    return await Customer.create({ ...req.body })
      .then((val) => {
        if (val) responses.success(res, val, "New user success created")
      })
      .catch((err) => {
        if (err.code == "11000")
          return responses.fail(res, "Customer already resgistered")
        throw new Error(err)
      })
  } catch (error) {
    if (error instanceof Error) {
      responses.error(res, error.message)
    }
  }
})

app.delete("/", async (req, res) => {
  try {
    isValidKeyRequest(["id"], req)
    const id = isValidObjectId(req.body.id) ? req.body.id : false

    if (!id) {
      throw new Error("ID not valid")
    }

    await Customer.findByIdAndDelete(id).then((data, err) => {
      if (data) {
        return responses.success(res, data, "Success deleted customer")
      } else {
        throw new Error("Customer not found")
      }
    })
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      return responses.error(res, error.message)
    }
    responses.error(res, error)
  }
})

export default app
