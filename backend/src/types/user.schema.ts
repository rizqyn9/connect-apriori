import { z } from "zod"

export const userProps = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  isAdmin: z.boolean(),
})

export type UserProps = z.infer<typeof userProps>
