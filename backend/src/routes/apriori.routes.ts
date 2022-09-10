import { Router } from "express"
import * as transactionController from "@/controller/transaction.controller"
import * as productController from "@/controller/product.controller"
import { AprioriMining, Itemset, ItemsetCollection } from "@/lib/apriori"

const router = Router()

router.get("/", async (req, res, next) => {
  try {
    const { confidence = 50, support = 10 } = req.query
    // Get all transactions
    const transactions = await transactionController.getAll().then((data) => {
      return Promise.all(
        data.map((val) => {
          return Promise.all(val.orderList.map((order) => productController.getProductByID(order.menuId).then((val) => val.menu)))
        })
      )
    })

    const db = new ItemsetCollection()

    transactions.forEach((x) => db.push(Itemset.from(x)))

    const apriori = AprioriMining.doApriori(db, Number(support))

    const resultConfidence = AprioriMining.mine(db, apriori, Number(confidence))

    res.json({
      payload: {
        transactions,
        apriori: apriori.toDataJSON(),
        confidence: resultConfidence,
      },
    })
  } catch (error) {
    next(error)
  }
})

export default router
