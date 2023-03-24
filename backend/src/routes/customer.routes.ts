import { Router } from "express"
import { findByCardId } from "@/controller/customer.controller"

const app = Router()

app.get("/check-exist", async (req, res, next) => {
  try {
    const { cardId } = req.query
    const isCustomerExist = findByCardId(String(cardId))
      .then(() => true)
      .catch(() => false)

    res.json({
      payload: { isCustomerExist },
    })
  } catch (error) {
    next(error)
  }
})

export default app
