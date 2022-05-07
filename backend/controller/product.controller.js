import ProductModel from "../models/Product.model.js"

const getProductByID = async (id) =>
  await ProductModel.findById(id).then((val, rej) => {
    if (val) return val._doc
    else throw new Error("Product not found")
  })

const getProduts = async () =>
  await ProductModel.find().then((val, rej) => {
    if (val) return val
    else throw new Error("Something error")
  })

const create = async (data) =>
  await ProductModel.create({ ...data }).then((val, rej) => {
    if (val) return val
    else throw new Error(rej.toString())
  })

const update = async (id, data) =>
  await ProductModel.findByIdAndUpdate(id, { ...data }).then((val, rej) => {
    if (val) return val
    else throw new Error(rej.toString())
  })

const remove = async (id) =>
  await ProductModel.findByIdAndRemove(id).then((val, rej) => {
    if (val) return val
    else throw new Error("ID not found")
  })

const incrementOrderById = async (id, increment) =>
  await ProductModel.findByIdAndUpdate(id, {
    $inc: { totalOrdered: increment },
  }).then((val, rej) => {
    if (val) return val
    else throw new Error(`Product with id ${id} not found`)
  })

export {
  getProductByID,
  getProduts,
  create,
  update,
  remove,
  incrementOrderById,
}
