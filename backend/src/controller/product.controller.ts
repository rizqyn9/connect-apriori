import ProductModel, { ProductProps } from "../models/Product"
import { imageKitController } from "./imagekit.controller"

const getProductByID = async (id: string) => await ProductModel.findById(id).then((val) => val ?? Promise.reject("Product not found"))

const getAllProduts = async () => await ProductModel.find().then((val) => val)

const create = async (data: ProductProps) => {
  const image = await imageKitController.upload(data.imageURL, Date.now().toString())
  return await ProductModel.create({ ...data, imageURL: image.url }).then((val) => val)
}

const update = async (id: string, data: ProductProps) =>
  await ProductModel.findByIdAndUpdate(id, { ...data }).then((val) => val ?? Promise.reject("Product not found"))

const remove = async (id: string) => await ProductModel.findByIdAndRemove(id).then((val) => val ?? Promise.reject("Product not found"))

const incrementOrderById = async (id: string, increment: number) =>
  await ProductModel.findByIdAndUpdate(id, {
    $inc: { totalOrdered: increment },
  }).then((val) => val ?? Promise.reject(`Product with id: ${id} not found`))

const decrementOrderById = async (id: string, decrement: number) => await incrementOrderById(id, decrement * -1)

export const productController = { getProductByID, getAllProduts, create, update, remove, incrementOrderById, decrementOrderById }
