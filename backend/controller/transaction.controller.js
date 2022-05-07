import TransactionModel from "../models/Transaction.model.js"

const getAll = async () =>
  await TransactionModel.find().then((val, rej) => {
    if (val) return val
    else throw new Error("Transaction not found")
  })

const getById = async () => {}

const create = async () => {}

const remove = async () => {}

export { getAll, getById, create, remove }
