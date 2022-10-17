import { Router } from "express"
import { productController } from "@/controller"
import { getAll as getAllPromos } from "@/controller/promo.controller"
import { getAll as getAllTransactions } from "@/controller/transaction.controller"

const app = Router()

app.get("/", async (req, res, next) => {
  try {
    const [products, transactions, promos] = await Promise.all([productController.getAllProduts(), getAllTransactions(), getAllPromos()])

    const payload = { products, transactions, promos }

    return res.json({ payload })
  } catch (error) {
    next(error)
  }
})

export default app
