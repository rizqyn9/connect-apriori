import ProductModel from "../models/Product.model.js"

const productController = {
  getProductByID: async (id) =>
    await ProductModel.findById(id).then((val, rej) => {
      if (val) return val._doc
      else throw new Error("Product not found")
    }),
  getProduts: async () =>
    await ProductModel.find().then((val, rej) => {
      if (val) return val
      else throw new Error("Something error")
    }),
  create: async (data) =>
    await ProductModel.create({ ...data }).then((val, rej) => {
      if (val) return val
      else throw new Error(rej.toString())
    }),
  update: async (id, data) =>
    await ProductModel.findByIdAndUpdate(id, { ...data }).then((val, rej) => {
      if (val) return val
      else throw new Error(rej.toString())
    }),
  delete: async (id) =>
    await ProductModel.findByIdAndRemove(id).then((val, rej) => {
      if (val) return val
      else throw new Error("ID not found")
    }),
}

export default productController
