import { Router } from "express"
import * as CustomerController from "@/controller/customer.controller"
import { isValidObjectId } from "@/utils"

const app = Router()

/* ---------------------------- Get all customers --------------------------- */
app.get("/", async (req, res, next) => {
  try {
    CustomerController.getAll().then((payload) => res.json({ payload }))
  } catch (error) {
    next(error)
  }
})

/* ----------------------- Get specific customer by id ---------------------- */
app.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    isValidObjectId(id)
    CustomerController.getById(id).then((payload) => res.json({ payload }))
  } catch (error) {
    next(error)
  }
})

/* ----------------------------- Create customer ---------------------------- */
app.post("/create", async (req, res, next) => {
  try {
    console.log(req.body)

    return await CustomerController.create({
      name: String(req.body.name),
    }).then((payload) => res.json({ payload }))
  } catch (error) {
    // isMongooseError(error)
    next(error)
  }
})

/* --------------------------- Create delete by id -------------------------- */
app.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params

    isValidObjectId(id)

    CustomerController.deleteById(id).then((payload) => res.json({ payload }))
  } catch (error) {
    next(error)
  }
})

export default app
