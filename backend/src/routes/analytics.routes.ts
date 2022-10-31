import { Router } from "express"
import { productController } from "@/controller"
import { getAll as getAllPromos } from "@/controller/promo.controller"
import { getAll as getAllTransactions } from "@/controller/transaction.controller"

const app = Router()

app.get("/", async (req, res, next) => {
  try {
    const [products, transactions, promos] = await Promise.all([productController.getAllProduts(), getAllTransactions(), getAllPromos()])

    const orders = transactions.map((x) => x.orders).flat()
    const summary = orders.reduce<Map<string, number>>((prev, curr) => {
      const currId = curr.productId.toString()
      if (prev.has(currId)) {
        const qty = prev.get(currId)! + curr.quantity
        return prev.set(currId, qty)
      }
      return prev.set(currId, curr.quantity)
    }, new Map())

    const calc = products.reduce<(unknown & { totalOrdered: number })[]>((prev, curr) => {
      const currId = curr._id.toString()
      return [
        ...prev,
        {
          ...curr.toJSON(),
          totalOrdered: summary.get(currId) || 0,
        },
      ]
    }, [])

    const payload = { products: calc, transactions, promos }
    return res.json({ payload })
  } catch (error) {
    next(error)
  }
})

export default app
