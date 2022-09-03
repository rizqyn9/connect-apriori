import { Router } from "express"
import { Apriori } from "@/lib/apriori"
import * as transactionController from "@/controller/transaction.controller"
import * as productController from "@/controller/product.controller"

const router = Router()

router.get("/", async (req, res, next) => {
  try {
    // Get all transactions
    const transactions = await transactionController.getAll().then((data) => {
      return Promise.all(
        data.map((val) => {
          return Promise.all(val.orderList.map((order) => productController.getProductByID(order.menuId).then((val) => val.menu)))
        })
      )
    })

    const transactionTotal = transactions.length
    console.log({ transactionTotal })

    const apriori = new Apriori(0.7)
    const itemMin = 2

    apriori.on("data", (itemset) => {
      console.log({ itemset })
    })

    await apriori.exec(transactions).then((result) => {
      // a = result.itemsets.filter(({ items }) => items.length >= itemMin)
      return res.json({
        payload: {
          itemsets: result.itemsets,
        },
        transactions,
      })
    })
  } catch (error) {
    next(error)
  }
})

export default router
