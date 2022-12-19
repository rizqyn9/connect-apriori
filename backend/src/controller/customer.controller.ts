import CustomerModel, { CustomerProps } from "@/models/customer"

const createNewCustomer = async (data: CustomerProps) => {
  return await CustomerModel.create(data)
}

export { createNewCustomer }
