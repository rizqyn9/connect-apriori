import React, { useEffect, useState, useRef } from 'react'
import ReactImageUploading from 'react-images-uploading'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { PostProduct } from '../services/product.service'
import { Routes, Route, useParams } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import { GridRow } from '../components/Grid'
import { H1 } from '../components/Typography'

export function ProductPage() {
    return (
        <Routes>
            <Route index element={<InputProduct />} />
            <Route path=":id" element={<InputProduct />} />
        </Routes>
    )
}

const schema = yup.object({
    menu: yup.string('req').required('req'),
    price: yup.number().required(),
    image: yup.mixed().required(),
})

function InputProduct() {
    const { id } = useParams()
    const [product, setProducts] = useState({})
    const { getProductById, postProduct, testPostProduct } = useProducts()
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    useEffect(async () => {
        if (!id) return
        await getProductById(id).then((val) => {
            setProducts(val)
            setValue('menu', val.menu)
            setValue('price', val.price)
        })
    }, [])

    const handleImageForm = (res) => {
        console.log(res)
        // setValue('image', res)
    }

    const onSubmit = async (data) => {
        console.log(data)
        const formData = new FormData()
        Object.entries(data).forEach(([key, val]) => {
            if (key == 'image') return
            formData.append(key, val)
        })
        formData.append('image', data.image[0])
        console.log(data.image[0])
        await testPostProduct(formData)
    }

    return (
        <>
            <GridRow
                className={'px-5 w-full flex-auto'}
                title={
                    <div className="flex flex-col justify-center h-full w-full">
                        <H1>Input Product</H1>
                    </div>
                }
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    encType="application/x-www-form-urlencoded"
                    className={'h-full flex gap-2 py-8'}
                >
                    {/*Input Image*/}
                    <div className="h-full w-full" style={{ flex: '1 1 55%' }}>
                        <ImagePlanInput name={'image'} register={register} />
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
            </GridRow>
        </>
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

function ImagePlanInput({ register, name }) {
    const [selectedImage, setSelectedImage] = useState(null)
    const imageRef = useRef()

    const imageOnChange = (e) => {
        console.log(e)
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0])
        }
    }

    const removeImage = () => {
        imageRef.current.value = null
        setSelectedImage(null)
    }

    return (
        <div className="bg-dark-2 rounded-lg p-6 flex flex-col gap-4">
            <input
                accept="image/*"
                type="file"
                {...register(name)}
                name={name}
                onChange={imageOnChange}
                ref={imageRef}
                className={
                    'block w-full py-4 px-2 border-2 border-primary rounded-lg text-center'
                }
                id={'thumbnail'}
            />
            {selectedImage && (
                <>
                    <label htmlFor="thumbnail">
                        <img
                            className="rounded-lg border-2 border-primary"
                            src={URL.createObjectURL(selectedImage)}
                        />
                    </label>
                    <button
                        className="bg-red-700 hover:bg-red-800 rounded-md w-1/2 mx-auto p-3"
                        onClick={removeImage}
                    >
                        Remove Image
                    </button>
                </>
            )}
        </div>
    )
}
