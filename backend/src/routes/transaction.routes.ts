import { Router } from "express"
import * as transactionController from "@/controller/transaction.controller"
import * as productController from "@/controller/product.controller"
import { transactionSchema } from "@/types/transaction.schema"

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
    await Promise.all(Array.from(orderList).map((val) => productController.incrementOrderById(val.menuId, val.quantity)))

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
    // Transa
  } catch (error) {
    next(error)
  }
})

export default app
