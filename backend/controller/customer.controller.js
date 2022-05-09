import CustomerModel from "../models/Customer.model.js"

const getCustomerById = async (id) => {
  return await CustomerModel.findById(id)
}

const getAllCustomer = async () => {
  return await CustomerModel.find({})
}

export { getCustomerById, getAllCustomer }
