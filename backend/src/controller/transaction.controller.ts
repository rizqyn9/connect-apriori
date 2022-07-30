import TransactionModel from "@/models/Transaction"
import { TransactionSchema } from "@/types/transaction.schema"

const getAll = async () => await TransactionModel.find().then((val) => val ?? Promise.reject("Transaction not found"))

const getById = async () => {}

const create = async (data: TransactionSchema) => await TransactionModel.create(data)

const remove = async (id: string) => {
  await TransactionModel.findById(id).then((transaction) => {
    // transaction?.orderList.map(val => )
  })
}

export { getAll, getById, create, remove }
