import PromoModel from "../models/Promo.model.js"

const getAll = async () =>
  await PromoModel.find().then((val, rej) => {
    if (val) return val
    else throw new Error("Failed to find promo")
  })

const getById = async (id) =>
  await PromoModel.findById(id).then((val, rej) => {
    if (val) return val
    else throw new Error("Failed to find promo")
  })

/**
 * @param {Array} list of ProductID
 * @param {Number} discount
 * @returns Promise.PromoModel
 */
const create = async (listProduct, discount) =>
  await PromoModel.create({ productsList: listProduct, discount }).then(
    (val, rej) => {
      if (val) return val
      else throw new Error("Failed to create new promo")
    }
  )

const update = async (id, data) =>
  await PromoModel.findById(id, { ...data }).then((val, rej) => {
    if (val) return val
    else throw new Error("Failed to update promo")
  })

const remove = async (id) =>
  await PromoModel.findByIdAndRemove(id).then((val, rej) => {
    if (val) return val
    else throw new Error("Failed to deleted promo")
  })

const isValidPromo = async () => {}

const assignProductToPromo = async (promo, productId) => {
  return promo.products.push(productId)
}

export { getAll, getById, create, update, remove, isValidPromo }
