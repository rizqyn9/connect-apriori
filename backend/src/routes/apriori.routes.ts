import { Router } from "express"
import * as transactionController from "@/controller/transaction.controller"
import { AprioriMining, Itemset, ItemsetCollection } from "@/lib/apriori"

const router = Router()

router.get("/", async (req, res, next) => {
  try {
    const { confidence = 100, support = 30 } = req.query
    // Get all transactions
    const transactions = await transactionController.TransactionModel.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "orders.productId",
          foreignField: "_id",
          as: "products",
        },
      },
    ])

    const products = transactions.reduce<unknown[][]>((prev, curr) => {
      // @ts-expect-error
      const productsInTransaction = curr.products.reduce((prev1, curr1) => {
        return [...prev1, curr1.menu]
      }, [])
      return [...prev, productsInTransaction]
    }, [])

    // console.log(products)
    const db = new ItemsetCollection()

    products.forEach((x) => db.push(Itemset.from(x)))

    const apriori = AprioriMining.doApriori(db, Number(support))

    const resultConfidence = AprioriMining.mine(db, apriori, Number(confidence))

    res.json({
      payload: {
        transactions: products,
        apriori: apriori.toDataJSON(),
        confidence: resultConfidence,
      },
    })
  } catch (error) {
    next(error)
  }
})

export default router
