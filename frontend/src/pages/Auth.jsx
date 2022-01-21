import React, { forwardRef, useState } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../config'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import instance from '../utils'

function Auth({ children }) {
    return (
        <div className="bg-violet-800 flex h-screen overflow-hidden justify-center">
            <div className="py-7 px-8 flex flex-col gap-2 bg-white w-3/5 min-w-max max-w-sm min-h-[10rem] self-center rounded-xl">
                {children}
            </div>
        </div>
    )
}

export function SignUp() {
    const schema = yup
        .object({
            name: yup.string().required(),
            email: yup.string().email('Email not valid').required(),
            password: yup
                .string()
                .min(8, 'Min pass 8 characters')
                .max(13, 'Max pass 13 characters')
                .required('Password is required'),
        })
        .required()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data) => {
        console.log(data)
        try {
            let res = await instance.post('/auth/signup', data)
        } catch (e) {
            setError('email', {
                message: 'Email already registered',
            })
        }
    }

    return (
        <Auth>
            {/* TITLE */}
            <h1 className="h4 py-3 mb-5 text-center">DAFTAR</h1>
            {/* FORM */}
            <form
                className={'w-full flex flex-col gap-2'}
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormInput
                    label={'Name'}
                    register={register}
                    name={'name'}
                    type={'text'}
                    errors={errors.name?.message}
                />
                <FormInput
                    label={'Email'}
                    register={register}
                    name={'email'}
                    type={'email'}
                    errors={errors.email?.message}
                />
                <FormInput
                    label={'Password'}
                    register={register}
                    name={'password'}
                    type={'password'}
                    errors={errors.password?.message}
                />
                <input
                    type={'submit'}
                    value={'Sign Up'}
                    className={
                        'py-2 mt-8 rounded-lg bg-indigo-700 text-white hover:bg-indigo-800 cursor-pointer'
                    }
                />
                <Link
                    to={'/auth/signin'}
                    className={
                        'text-sm text-indigo-400 hover:text-indigo-600 italic mt-3'
                    }
                >
                    Already have account ?
                </Link>
            </form>
        </Auth>
    )
}

export function SignIn() {
    const schema = yup
        .object({
            email: yup.string().email('Email not valid').required(),
            password: yup.string().required('Password is required'),
        })
        .required()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = () => {}

    return (
        <Auth>
            {/* TITLE */}
            <h1 className="h4 py-3 mb-5 text-center">MASUK</h1>
            {/* FORM */}
            <form
                className={'w-full flex flex-col gap-2'}
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormInput
                    label={'Email'}
                    register={register}
                    name={'email'}
                    type={'email'}
                    errors={errors.email?.message}
                />
                <FormInput
                    label={'Password'}
                    register={register}
                    name={'password'}
                    type={'password'}
                    errors={errors.password?.message}
                />
                <input
                    type={'submit'}
                    value={'Sign In'}
                    className={
                        'py-2 mt-8 rounded-lg bg-indigo-700 text-white hover:bg-indigo-800 cursor-pointer'
                    }
                />
                <Link
                    to={'/auth/signup'}
                    className={
                        'text-sm text-indigo-400 hover:text-indigo-600 italic mt-3'
                    }
                >
                    Create new account ?
                </Link>
            </form>
        </Auth>
    )
}

function FormInput({ name, register, label, errors, type = 'text' }) {
    return (
        <label htmlFor={name} className={'w-full flex flex-col'}>
            <p className="ml-1 pb-1 text-sm font-medium">{label}</p>
            <input
                id={name}
                name={name}
                type={type}
                {...register(name)}
                className={
                    'py-2 px-3 rounded-md text-white bg-gray-600 outline-2 outline-offset-5 outline-red-200 '
                }
            />
            {errors && (
                <p className={'text-xs mt-1 italic text-red-500'}>{errors}</p>
            )}
        </label>
    )
}
