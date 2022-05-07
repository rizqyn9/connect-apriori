const CustomerModel = require("../models/Customer.model")

const customerController = {
  getCustomerById: async (id) => {
    return await CustomerModel.findById(id)
  },
  getAllCustomer: async () => {
    return await CustomerModel.find({})
  },
}

module.exports = customerController
