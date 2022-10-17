import TransactionModel from "@/models/Transaction"
import { TransactionSchema } from "@/types/transaction.schema"
import { MongoObject } from "../types/misc.schema"
import { productController } from "./product.controller"

const getAll = async () => await TransactionModel.find().then((val) => val ?? Promise.reject("Transaction not found"))

const getById = async () => {}

const create = async (data: TransactionSchema) => await TransactionModel.create(data)

const remove = async (id: MongoObject) => {
  try {
    const promises: Promise<unknown>[] = []
    await TransactionModel.findById(id).then((transaction) =>
      transaction?.orderList.map(({ menuId, variants: { ice = 0, hot = 0 } }) =>
        promises.push(productController.decrementOrderById(menuId.toString(), ice + hot))
      )
    )

    return await Promise.all(promises).then((val) => TransactionModel.findByIdAndDelete(id))
  } catch (error) {
    return Promise.reject(error)
  }
}

export { getAll, getById, create, remove }
