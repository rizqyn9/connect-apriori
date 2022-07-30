import { Router } from "express"
import { Apriori, Itemset, IAprioriResults } from "node-apriori"
import * as transactionController from "@/controller/transaction.controller"

const router = Router()

router.get("/", async (req, res, next) => {
  try {
    // Get all transactions
    const transactions = await transactionController.getAll().then((data) => {
      return data.map((val) => {
        return val.orderList.map((order) => order.menuId)
      })
    })

    res.json({ transactions })
    // const dataSet = transactions.map((val) => {
    //   return
    // })
  } catch (error) {}
})

export default router
