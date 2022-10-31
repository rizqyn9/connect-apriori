import CustomerModel, { CustomerProps } from "@/models/customer.js"

const getById = async (id: string) => await CustomerModel.findById(id).then((val) => val ?? Promise.reject("Customer not found"))

const getAll = async () => await CustomerModel.find().then((val) => val ?? Promise.reject("Something error"))

const create = async (data: CustomerProps) => await CustomerModel.create(data)

const deleteById = async (id: string) =>
  await CustomerModel.findByIdAndDelete(id).then((val) => val ?? Promise.reject("Customer not found"))

export { getById, getAll, create, deleteById }
