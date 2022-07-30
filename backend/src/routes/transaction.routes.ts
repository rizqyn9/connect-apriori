import { Router } from "express"
import * as transactionController from "@/controller/transaction.controller"
import * as productController from "@/controller/product.controller"
import { transactionSchema } from "@/types/transaction.schema"
import { mongoObject } from "../types/misc.schema"

const app = Router()

/* -------------------------- Get all transactions -------------------------- */
app.get("/", async (req, res, next) => {
  try {
    await transactionController.getAll().then((payload) => res.json({ payload }))
  } catch (error) {
    next(error)
  }
})

/* ------------------------- Create new transaction ------------------------- */
app.post("/", async (req, res, next) => {
  try {
    const parsed = transactionSchema.parse(req.body)
    const { orderList } = parsed

    /* --------------------- Update quantity ordered product -------------------- */
    await Promise.all(
      Array.from(orderList).map(({ menuId, variants: { ice = 0, hot = 0 } }) => productController.incrementOrderById(menuId, ice + hot))
    )

    /* --------------------------- Create transaction --------------------------- */
    const transaction = await transactionController.create({ ...parsed })

    res.json({
      msg: "Success create transaction",
      payload: transaction,
    })
  } catch (error) {
    next(error)
  }
})

/* --------------------------- Remove Transaction --------------------------- */
app.delete("/:id", async (req, res, next) => {
  try {
    const id = mongoObject.parse(req.params.id)
    await transactionController.remove(id).then((val) => res.json({ payload: val }))
  } catch (error) {
    next(error)
  }
})

export default app
