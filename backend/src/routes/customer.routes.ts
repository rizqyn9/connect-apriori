import { Router } from "express"
import CustomerModel from "@/models/customer"

const app = Router()

app.get("/check-exist", async (req, res, next) => {
  try {
    const { cardId } = req.query
    const isCustomerExist = await CustomerModel.exists({ cardId })
    res.json({
      isCustomerExist,
    })
  } catch (error) {
    next(error)
  }
})

export default app
