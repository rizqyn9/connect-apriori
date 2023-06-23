import { Request, Response } from "express"
import { ProductModel, productValidator, Product } from "../models/product"
import { imageKitController } from "./imagekit.controller"
import { NotFound } from "@/lib/error"

export async function getAllProduts() {
  return ProductModel.find({})
}

export async function getProductById(id: string) {
  const product = await Product.findById(id)
  if (!product) throw new NotFound()
  return product
}

export async function createProduct(req: Request, res: Response) {
  const { menu, price, imageURL } = productValidator.parse(req.body)

  const product = new Product({ menu, price })
  if (imageURL) await imageKitController.upload(imageURL, Date.now().toString()).then((x) => (product.imageURL = x.url))
  await product.save()
  res.json({ payload: product })
}

export async function handleUpdate(req: Request, res: Response) {
  const product = await Product.findByIdAndUpdate(req.params.id, productValidator.deepPartial().parse(req.body))
  res.json({
    payload: product,
  })
}

export async function handleProductDetails(req: Request, res: Response) {
  res.json({
    payload: await getProductByID(req.params.id),
  })
}

export async function handleRemoveProduct(req: Request, res: Response) {
  const product = await Product.findByIdAndRemove(req.params.id)
  if (!product) throw new NotFound()

  res.json({
    payload: product,
  })
}

const getProductByID = async (id: string) => await ProductModel.findById(id).then((val) => val ?? Promise.reject("Product not found"))

const incrementOrderById = async (id: string, increment: number) =>
  await ProductModel.findByIdAndUpdate(id, {
    $inc: { totalOrdered: increment },
  }).then((val) => val ?? Promise.reject(`Product with id: ${id} not found`))

const decrementOrderById = async (id: string, decrement: number) => await incrementOrderById(id, decrement * -1)

export const productController = { getProductByID, getAllProduts, incrementOrderById, decrementOrderById }
