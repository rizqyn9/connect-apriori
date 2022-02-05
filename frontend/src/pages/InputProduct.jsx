import React, { useEffect, useState } from 'react'
import ReactImageUploading from 'react-images-uploading'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { PostProduct } from '../services/product.service'

const schema = yup.object({
    menu: yup.string('req').required('req'),
    price: yup.number().required(),
    image: yup.object().required(),
})

export default function InputProduct() {
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const handleImageForm = (res) => {
        setValue('image', res)
    }

    const onSubmit = async (data) => {
        console.log(data)
        await PostProduct({ ...data })
    }

    return (
        <div
            className={
                'px-7 py-5 max-h-screen w-full text-white flex flex-col gap-6 align-stretch'
            }
        >
            <h1
                className={
                    'h-[5rem] text-2xl font-bold border-b-2 w-full flex items-center '
                }
            >
                Input Product
            </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={'h-full flex gap-2'}
            >
                {/*Input Image*/}
                <div className="h-full w-full" style={{ flex: '1 1 55%' }}>
                    <ImageInput
                        onChange={handleImageForm}
                        errors={errors.image?.message}
                    />
                </div>

                {/*Form Input*/}
                <div
                    className={
                        'w-full flex-auto p-5 bg-dark-2 col-start-2 col-end-4 rounded-lg overflow-scroll'
                    }
                >
                    <FormInput
                        name={'menu'}
                        register={register}
                        label={'Nama Menu'}
                        errors={errors.menu?.message}
                    />{' '}
                    <FormInput
                        name={'price'}
                        register={register}
                        label={'Harga'}
                        errors={errors.price?.message}
                        other={{
                            type: 'number',
                            min: 5000,
                            step: '500',
                        }}
                    />
                    <button
                        type={'submit'}
                        className={'bg-primary p-3 w-full rounded-lg mt-5'}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

function FormInput({
    name,
    register,
    label,
    errors,
    type = 'text',
    other = {},
}) {
    return (
        <label
            htmlFor={name}
            className={'w-full flex flex-col gap-2 justify-around my-5'}
        >
            <p className="ml-1 text-md font-medium">{label}</p>
            <input
                id={name}
                name={name}
                type={type}
                {...register(name)}
                {...other}
                className={clsx(
                    'py-2 px-3 rounded-md text-white bg-form outline-2 outline-offset-5 outline-red-200 outline-none',
                    { 'border-2 border-red-500': errors }
                )}
            />
        </label>
    )
}

function ImageInput({ onChange, errors }) {
    const [image, setImage] = useState([])

    const handleChange = (a, b) => {
        let imageData = a[a.length - 1]
        setImage(a)
        if (onChange) onChange(imageData)
    }

    return (
        <ReactImageUploading
            value={image}
            onChange={handleChange}
            dataURLKey="data"
        >
            {({ isDragging, dragProps, onImageUpdate, onImageRemove }) => (
                <div
                    className={`w-full h-[30rem] flex justify-center bg-dark-2 rounded-lg ${
                        isDragging ? 'bg-dark-line' : ''
                    }`}
                    {...dragProps}
                >
                    <div className="w-full h-full">
                        <div className="p-6 w-full h-full flex flex-col gap-2">
                            <label className="inline-block mb-2 text-white/70">
                                Upload Image (jpg,png,svg,jpeg)
                            </label>
                            <div className="flex items-center justify-center w-full h-full ">
                                <label
                                    className={clsx(
                                        'flex flex-col w-full h-full border-4 border-dashed border-dark-line hover:bg-dark-line hover:border-gray-300',
                                        `${errors ? 'border-red-500' : ''}`
                                    )}
                                >
                                    {image.length !== 0 ? (
                                        <img src={image[0].data} alt="" />
                                    ) : (
                                        <div className="h-full flex items-center justify-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                                Select a photo
                                            </p>
                                        </div>
                                    )}
                                </label>
                            </div>
                        </div>
                        {/*Button*/}
                        <div className="flex items-center justify-center p-2">
                            <button
                                className={clsx(
                                    'px-4 py-2 text-white bg-primary rounded shadow-xl',
                                    { 'bg-dark-2': image.length === 0 }
                                )}
                                onClick={(e) => {
                                    if (image.length === 0)
                                        return onImageUpdate()
                                    else return onImageRemove()
                                }}
                            >
                                {image.length === 0 ? 'Upload' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </ReactImageUploading>
    )
}
