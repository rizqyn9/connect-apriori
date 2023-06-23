import { TransactionModel } from "@/models"
import { TransactionProps } from "@/types/transaction.schema"

const getAll = async () => await TransactionModel.find()

const create = async (data: TransactionProps) => await TransactionModel.create(data)

export { getAll, create, TransactionModel }
