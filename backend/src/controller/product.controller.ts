import ProductModel, { ProductProps } from "../models/Product"

const getProductByID = async (id: string) =>
  await ProductModel.findById(id).then(
    (val) => val ?? Promise.reject("Product not found")
  )

const getAllProduts = async () => await ProductModel.find().then((val) => val)

const create = async (data: ProductProps) =>
  await ProductModel.create({ ...data }).then((val) => val)

const update = async (id: string, data: ProductProps) =>
  await ProductModel.findByIdAndUpdate(id, { ...data }).then(
    (val) => val ?? Promise.reject("Product not found")
  )

const remove = async (id: string) =>
  await ProductModel.findByIdAndRemove(id).then(
    (val) => val ?? Promise.reject("Product not found")
  )

const incrementOrderById = async (id: string, increment: number) =>
  await ProductModel.findByIdAndUpdate(id, {
    $inc: { totalOrdered: increment },
  }).then((val) => val ?? Promise.reject(`Product with id: ${id} not found`))

export {
  getProductByID,
  getAllProduts,
  create,
  update,
  remove,
  incrementOrderById,
}
