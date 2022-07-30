import { MongoObject } from "@/types"
import ProductModel, { ProductProps } from "../models/Product"

const getProductByID = async (id: MongoObject) => await ProductModel.findById(id).then((val) => val ?? Promise.reject("Product not found"))

const getAllProduts = async () => await ProductModel.find().then((val) => val)

const create = async (data: ProductProps) => await ProductModel.create({ ...data }).then((val) => val)

const update = async (id: MongoObject, data: ProductProps) =>
  await ProductModel.findByIdAndUpdate(id, { ...data }).then((val) => val ?? Promise.reject("Product not found"))

const remove = async (id: MongoObject) => await ProductModel.findByIdAndRemove(id).then((val) => val ?? Promise.reject("Product not found"))

const incrementOrderById = async (id: MongoObject, increment: number) =>
  await ProductModel.findByIdAndUpdate(id, {
    $inc: { totalOrdered: increment },
  }).then((val) => val ?? Promise.reject(`Product with id: ${id} not found`))

const decrementOrderById = async (id: MongoObject, decrement: number) => await incrementOrderById(id, decrement * -1)

export { getProductByID, getAllProduts, create, update, remove, incrementOrderById, decrementOrderById }
