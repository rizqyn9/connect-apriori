import dotenv from "dotenv"
import { z } from "zod"

dotenv.config()
const config = z
  .object({
    MONGO_URI: z.coerce.string(),
    PORT: z.coerce.number(),
    IMAGEKIT_PRIVATE: z.coerce.string(),
    IMAGEKIT_PUBLIC: z.coerce.string(),
    IMAGEKIT_ENDPOINT: z.coerce.string(),
  })
  .parse(process.env)

console.log({ config })

export { config }
