import { Router } from "express"
import { parseOrder } from "@/lib/parseOrder"
import * as TransactionController from "@/controller/transaction.controller"
import * as productController from "@/controller/product.controller"
import { isValidKeyRequest } from "@/utils"

const app = Router()

/* -------------------------- Get all transactions -------------------------- */
app.get("/", async (req, res, next) => {
  try {
    await TransactionController.getAll().then((payload) =>
      res.json({ payload })
    )
  } catch (error) {
    next(error)
  }
})

/* ------------------------- Create new transaction ------------------------- */
app.post("/create", async (req, res, next) => {
  try {
    isValidKeyRequest(["orders", "transaction"], req)
    const { orders, transaction } = req.body

    const parsedOrder = parseOrder(orders)

    // Update total order menu
    const listOrderId = await Promise.all(
      Object.entries(parsedOrder).map(([key, val]) =>
        productController.incrementOrderById(key, val.quantity)
      )
    )
    // .then(async (val) => {
    //   return await TransactionModel.create({
    //     orderList: val.map((data) => data._id),
    //     price: transaction.price,
    //     paymentMethod: transaction.paymentMethod,
    //     promo: isValidObjectId(transaction.promo, false) || null,
    //     discount: transaction.discount,
    //   })
    //     .then((data) => data)
    //     .catch((err) => {
    //       console.log(err)
    //       throw new Error("Transaction cant created")
    //     })
    // })
    // .catch((err) => {
    //   console.log(err)
    //   throw new Error("Update product error")
    // })

    console.log(listOrderId)

    res.json({
      msg: "Success create transaction",
      payload: listOrderId,
    })
  } catch (error) {
    next(error)
  }
})

export default app
