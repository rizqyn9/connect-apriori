import React, { useEffect, useState } from 'react'
import ReactImageUploading from 'react-images-uploading'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

export default function InputProduct() {
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm({
        // resolver: yupResolver(schema),
    })

    const handleImageForm = (res) => setValue('image', res[res.length - 1])

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div className={'bg-white py-3 px-5 rounded-lg'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className={'h3'}>Input Product</h1>
                <ImageInput onChange={handleImageForm} />
                <button type={'submit'}>Submit</button>
            </form>
        </div>
    )
}

function ImageInput({ onChange }) {
    const [image, setImage] = useState([])

    const handleChange = (a, b) => {
        // console.log({ a, b })
        setImage(a)
        if (onChange) onChange(a)
    }

    return (
        <ReactImageUploading
            value={image}
            onChange={handleChange}
            dataURLKey="data"
        >
            {({ isDragging, dragProps, onImageUpdate, onImageRemove }) => (
                <div
                    className={`flex justify-center mt-8 ${
                        isDragging ? 'bg-green-400' : ''
                    }`}
                    {...dragProps}
                >
                    <div className="rounded-lg shadow-xl bg-gray-50 lg:w-1/2">
                        <div className="m-4">
                            <label className="inline-block mb-2 text-gray-500">
                                Upload Image (jpg,png,svg,jpeg)
                            </label>
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col w-full border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                    {image.length !== 0 ? (
                                        <img src={image[0].data} alt="" />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center pt-7 ">
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
                        <div className="flex p-2 space-x-4">
                            <button
                                className={clsx(
                                    'px-4 py-2 text-white bg-red-500 rounded shadow-xl',
                                    { 'bg-green-400': image.length === 0 }
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
