import React, { forwardRef, useState } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../config'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

async function signIn() {
    try {
        let res = await axios.post(BASE_URL + '/auth/signup', {
            email: 'rizqy@gmail.com',
            password: 'test123',
            username: 'rizqyn9',
        })
        return res
    } catch (error) {
        console.log(error)
    }
}

function Auth({ children }) {
    return (
        <div className="bg-violet-800 flex h-screen overflow-hidden justify-center">
            <div className="py-7 px-8 flex flex-col gap-2 bg-gray-100 w-3/5 min-w-max max-w-sm min-h-[10rem] self-center rounded-xl">
                {children}
            </div>
        </div>
    )
}

export function SignIn() {
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await signIn().then((res) => {
            alert(JSON.stringify(res))
        })
        setLoading(false)
    }

    return (
        <Auth>
            {/* TITLE */}
            <h1 className="h4 py-3 mb-5 text-center">MASUK</h1>
            {/* FORM */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <AuthInput name={'test'} type={'email'} label={'Email'} />
                <AuthInput type={'password'} label={'Password'} />
                {/* BTN */}
                <Link to={'/auth/signup'}>Create Account</Link>
                <div className="flex w-full p-3 items-center justify-center">
                    <button
                        type="submit"
                        className="text-md bg-gray-600 text-white py-2 px-10 hover:bg-gray-800"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </Auth>
    )
}

export function SignUp() {
    const schema = yup
        .object({
            // name: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required(),
        })
        .required()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <Auth>
            {/* TITLE */}
            <h1 className="h4 py-3 mb-5 text-center">DAFTAR</h1>
            {/* FORM */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={'w-full flex flex-col gap-2'}
            >
                <FormInput label={'Name'} name={'name'} placeholder={'Nama'} />
                <FormInput label={'Email'} name={'email'} />
                <FormInput label={'Password'} name={'password'} />
                <input
                    type={'submit'}
                    value={'Sign In'}
                    className={'py-2 mt-5 rounded-lg bg-green-700 text-white'}
                />
            </form>
        </Auth>
    )
}

function FormInput({ name, label, type, ...props }) {
    return (
        <label htmlFor={name} className={'w-full flex flex-col'}>
            <p className="ml-1 pb-1 text-sm font-medium">{label}</p>
            <input
                type={type}
                id={name}
                {...props}
                className={
                    'py-2 px-3 rounded-md text-white bg-gray-600 outline-2 outline-offset-5 outline-red-200'
                }
            />
        </label>
    )
}
const AuthInput = forwardRef(
    ({ name, type, label, onChange, required = false }, ref) => {
        return (
            <label htmlFor={name} className="w-full flex flex-col">
                <p className="ml-1 pb-1 text-sm font-medium">{label}</p>
                <input
                    type={type}
                    name={name}
                    id={name}
                    className="py-2 px-3 rounded-md text-white bg-gray-600"
                    onChange={onChange}
                    required={required}
                />
            </label>
        )
    }
)
