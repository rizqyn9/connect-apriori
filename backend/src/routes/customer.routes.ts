import { Router } from "express"
import { findByCardId } from "@/controller/customer.controller"

const app = Router()

app.get("/check-exist", async (req, res, next) => {
  const { cardId } = req.query
  const isCustomerExist = await findByCardId(String(cardId))
    .then(() => true)
    .catch(() => false)

  res.json({
    payload: { isCustomerExist },
  })
})

export default app
