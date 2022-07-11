import PromoModel, { PromoProps } from "@/models/Promo.js"
import { Types } from "mongoose"

const getAll = async () =>
  await PromoModel.find().then(
    (val) => val ?? Promise.reject("Something error")
  )

const getById = async (id: string) =>
  await PromoModel.findById(id).then(
    (val) => val ?? Promise.reject("Promo not found")
  )

const create = async (
  listProduct: PromoProps["productsList"],
  discount: number
) =>
  await PromoModel.create({ productsList: listProduct, discount }).then(
    (val) => val ?? Promise.reject("Failed")
  )

const update = async (id: string, data: PromoProps) =>
  await PromoModel.findById(id, { ...data }).then(
    (val) => val ?? Promise.reject("Failed to update promo")
  )

const remove = async (id: string) =>
  await PromoModel.findByIdAndRemove(id).then(
    (val) => val ?? Promise.reject("Failed to deleted promo")
  )

const isValidPromo = async () => {}

const assignProductToPromo = async (
  promo: PromoProps,
  productId: Types.ObjectId
) => {
  return promo.productsList.push(productId)
}

export {
  getAll,
  getById,
  create,
  update,
  remove,
  isValidPromo,
  assignProductToPromo,
}
