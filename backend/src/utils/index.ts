import { isValidObjectId as checkValidId } from "mongoose"
import { Request } from "express"

const isValidKeyRequest = (compare: string[] = [], req: Request) => {
  for (const key of compare) {
    if (!req.body[key]) throw new Error(`${key} is required`)
  }
}

const isValidObjectId = (id: string, shouldThrow = true) => {
  const validId = id && checkValidId(id) ? id : false
  if (validId) return validId
  if (!validId && shouldThrow) {
    throw new Error("ID not valid")
  } else {
    return validId
  }
}

const isMongooseError = (error: unknown) => {
  if (error instanceof Error) {
    if (error.message.includes("E11000")) {
      error.message = "Duplicate"
    }
  }
}

export { isValidKeyRequest, isValidObjectId, isMongooseError }
