import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import {
    useForm,
    UseControllerProps,
    FieldValue,
    useController,
    FieldValues,
    FieldPath,
    Control,
} from 'react-hook-form'
import * as yup from 'yup'
import { z, infer } from 'zod'
import { yupResolver } from '@hookform/resolvers/yup'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../hooks/useAuth'
import { useIsAuthenticated } from 'react-auth-kit'

type AuthProps = {
    children: React.ReactNode
}
function Auth({ children }: AuthProps) {
    const shouldAuthenticated = useIsAuthenticated()
    return !shouldAuthenticated() ? (
        <div className="bg-dark-2 flex h-screen overflow-hidden justify-center text-white">
            <div className="py-7 px-8 flex flex-col gap-2 bg-dark-1 w-3/5 min-w-max max-w-sm min-h-[10rem] self-center rounded-xl">
                {children}
            </div>
        </div>
    ) : (
        <Navigate to={'/'} />
    )
}

const schema = yup
    .object({
        name: yup.string().required(),
        email: yup.string().email('Email not valid').required(),
        password: yup
            .string()
            .min(1, 'Min pass 8 characters')
            .max(13, 'Max pass 13 characters')
            .required('Password is required'),
    })
    .required()

const signUpSchema = z.object({
    name: z.string().min(1, 'Name required'),
    email: z.string().email('Email not valid').min(1, 'Email required'),
    password: z
        .string()
        .min(1, 'Min pass 8 characters')
        .max(13, 'Max pass 13 characters'),
})

type SignUpSchema = z.infer<typeof signUpSchema>

export function SignUp() {
    const { signUp: SignUpServices } = useAuth()

    const { handleSubmit, control } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
    })

    const onSubmit = async (data: SignUpSchema) => {
        console.log(data)
        await SignUpServices(data)
    }

    return (
        <Auth>
            {/* TITLE */}
            <h1 className="text-xl font-bold py-3 mb-3 text-center">DAFTAR</h1>
            {/* FORM */}
            <form
                className={'w-full flex flex-col gap-5'}
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormInput
                    control={control}
                    label={'Name'}
                    name="name"
                    type={'text'}
                />
                <FormInput
                    control={control}
                    label={'Email'}
                    name={'email'}
                    type={'email'}
                />
                <FormInput
                    control={control}
                    label={'Password'}
                    name={'password'}
                    type={'password'}
                />
                <button
                    type={'submit'}
                    className={
                        'py-2 mt-8 rounded-lg bg-primary hover:bg-primary/80 cursor-pointer'
                    }
                >
                    Sign Up
                </button>
                <Link
                    to={'/auth/signin'}
                    className={'text-sm hover:text-white/80 italic mt-3'}
                >
                    Already have account ?
                </Link>
            </form>
        </Auth>
    )
}

export function SignIn() {
    const { signIn } = useAuth()

    const schema = yup
        .object({
            email: yup
                .string()
                .email('Email not valid')
                .required('Email is required'),
            password: yup.string().required('Password is required'),
        })
        .required()

    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data) => {
        await signIn(data)
    }

    return (
        <Auth>
            {/* TITLE */}
            <h1 className="text-xl font-bold py-3 mb-3 text-center">MASUK</h1>
            {/* FORM */}
            <form
                className={'w-full flex flex-col gap-4'}
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormInput
                    control={control}
                    label={'Email'}
                    name={'email'}
                    type={'email'}
                />
                <FormInput
                    control={control}
                    name={'password'}
                    label={'Password'}
                    type={'password'}
                />
                <button
                    type={'submit'}
                    value={'Sign In'}
                    className={
                        'py-2 mt-8 rounded-lg bg-primary hover:bg-primary/80 cursor-pointer'
                    }
                >
                    Sign In
                </button>
                <Link
                    to={'/auth/signup'}
                    className={
                        'text-sm text-white hover:text-white/80 italic mt-3'
                    }
                >
                    Create new account ?
                </Link>
            </form>
        </Auth>
    )
}

type FormInputProps<T extends FieldValues> = UseControllerProps<T> & {
    label: string
    type: React.HTMLInputTypeAttribute
}
function FormInput<T extends FieldValues = FieldValues>(
    props: FormInputProps<T>,
) {
    const { field, fieldState } = useController(props)
    return (
        <label htmlFor={field.name} className={'w-full flex flex-col'}>
            <p className="ml-1 pb-1 text-sm font-medium">{props.label}</p>
            <input
                id={field.name}
                type={props.type}
                {...field}
                className={
                    'py-2 px-3 rounded-md text-white bg-form outline-2 border-2 border-dark-line outline-offset-5 outline-red-200 '
                }
            />
            {fieldState.error && (
                <p className={'text-xs mt-1 italic text-red-300'}>
                    {fieldState.error.message}
                </p>
            )}
        </label>
    )
}
