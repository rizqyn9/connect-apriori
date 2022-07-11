import { z } from 'zod'

const signInSchema = z.object({
    email: z.string().email('Email not valid').min(1, 'Email is required'),
    password: z.string().min(1, 'Password is required'),
})

export type SignInSchema = z.infer<typeof signInSchema>

const signUpSchema = z.object({
    name: z.string().min(1, 'Name required'),
    email: z.string().email('Email not valid').min(1, 'Email required'),
    password: z
        .string()
        .min(1, 'Min pass 8 characters')
        .max(13, 'Max pass 13 characters'),
})

export type SignUpSchema = z.infer<typeof signUpSchema>

const productInputSchema = z.object({
    menu: z.string().min(1, 'Required'),
    price: z.number().min(1, 'Pice must be set'),
    image: z.object({}),
})

export type ProductInputSchema = z.infer<typeof productInputSchema>

export { signUpSchema, signInSchema, productInputSchema }
