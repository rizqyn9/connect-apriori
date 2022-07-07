import TransactionModel from "@/models/Transaction"

const getAll = async () =>
  await TransactionModel.find().then(
    (val) => val ?? Promise.reject("Transaction not found")
  )

const getById = async () => {}

const create = async () => {}

const remove = async () => {}

export { getAll, getById, create, remove }
