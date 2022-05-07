import mongoose from "mongoose"

const isValidKeyRequest = (compare = [], req) => {
  for (const key of compare) {
    if (!req.body[key]) throw new Error(`${key} is required`)
  }
}

const isValidObjectId = (id, shouldThrow = true) => {
  const validId = id && mongoose.isValidObjectId(id) ? id : false
  if (validId) return validId
  if (!validId && shouldThrow) {
    throw new Error("ID not valid")
  } else {
    return validId
  }
}

export { isValidKeyRequest, isValidObjectId }
