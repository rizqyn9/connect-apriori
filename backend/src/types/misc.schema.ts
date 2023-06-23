import { mongo } from "mongoose"
import { z } from "zod"

// Parse to mongoose ID
export const mongoObject = z.preprocess((val) => new mongo.ObjectId(String(val)), z.instanceof(mongo.ObjectId))

export type MongoObject = z.infer<typeof mongoObject>
