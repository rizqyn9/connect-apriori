import React, { useRef } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { GridRow } from '../components/Grid'
import { H1 } from '../components/Typography'
import { ProductInputSchema, productInputSchema } from '../utils/zod.schema'
import { Button } from '../components/Button'
import { useToastStore } from '../components/Toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FormInput } from '../components/Form/InputProduct'
import { convertBase64 } from '../utils/base64'
import { productService } from '../services'

export function ProductPage() {
    return (
        <Routes>
            <Route index element={<InputProduct />} />
            <Route path="/:id" element={<InputProduct />} />
        </Routes>
    )
}

function InputProduct() {
    const { id } = useParams()
    const { addToast } = useToastStore()
    const queryClient = useQueryClient()

    const {
        handleSubmit,
        setValue,
        control,
        watch,
        reset,
        formState: { errors },
    } = useForm<ProductInputSchema>({
        resolver: zodResolver(productInputSchema),
        mode: 'all',
    })

    const queryId = useQuery([id], () => productService.findId(String(id)), {
        enabled: !!id,
        onSuccess: (product) => {
            // @ts-expect-error
            Object.entries(product.product).forEach(([key, val]) => setValue(key, val))
            queryClient.invalidateQueries(['products'])
        },
    })

    const mutation = useMutation(productService.create, {
        onSuccess: () => {
            addToast({ msg: 'Success created new menu' })
            reset()
        },
        onError: () => addToast({ msg: 'Failed', type: 'error' }),
    })

    const editMutation = useMutation(productService.edit, {
        onSuccess: () => {
            addToast({ msg: 'Success update new menu' })
            reset()
        },
        onError: () => addToast({ msg: 'Failed', type: 'error' }),
    })

    const onSubmit = async (data: ProductInputSchema) => (!!id ? editMutation.mutate({ ...data, id: id }) : mutation.mutate(data))

    if (queryId.isLoading && !!id) return null
    return (
        <>
            <GridRow className="px-5 w-full flex-auto text-sm overflow-y-scroll" title={<Title />}>
                <fieldset disabled={mutation.isLoading}>
                    <form onSubmit={handleSubmit(onSubmit, (err) => console.log({ err }))} className="h-full flex gap-2 py-8 flex-col lg:flex-row">
                        <div className="lg:h-full w-full lg:flex-[1_1_55%]">
                            <ImagePlaceInput
                                name="image"
                                // @ts-ignore
                                setValue={(file) => setValue('imageURL', file)}
                                value={watch('imageURL')}
                                errors={errors?.imageURL?.message}
                            />
                        </div>

                        {/*Form Input*/}
                        <div className="w-full flex-auto p-5 bg-dark-2 col-start-2 col-end-4 rounded-lg overflow-scroll">
                            <FormInput control={control} name="menu" label="Nama Menu" defaultValue="" type="text" />
                            <FormInput control={control} name="price" label="Harga" defaultValue="" type="number" />
                            <Button className="w-full" type="submit">
                                Tambahkan
                            </Button>
                        </div>
                    </form>
                </fieldset>
            </GridRow>
        </>
    )
}

type ImagePlaceInputProps = {
    name: string
    setValue(arg: string | null): void
    value: null | string
    errors?: string
}

function ImagePlaceInput(props: ImagePlaceInputProps) {
    const { name, setValue, value, errors } = props
    const imageRef = useRef<HTMLInputElement>(null)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) convertBase64(e.target.files[0]).then((x) => setValue(x as string))
    }

    const removeImage = React.useCallback(() => {
        setValue(null)
        if (imageRef.current?.value) imageRef.current.value = ''
    }, [imageRef.current])

    return (
        <div className="bg-dark-2 rounded-lg p-6 flex flex-col gap-4">
            <input accept="image/*" type="file" hidden name={name} ref={imageRef} onChange={onChange} />
            {value ? (
                <Button onClick={removeImage}>Remove</Button>
            ) : (
                <Button onClick={(e) => imageRef.current?.click()} type="button">
                    Upload Image
                </Button>
            )}
            {errors && <p className="text-red-400">Image required</p>}
            {value && <img src={value ?? undefined} />}
        </div>
    )
}

function Title() {
    return (
        <div className="flex flex-col justify-center h-full w-full">
            <H1>Input Product</H1>
        </div>
    )
}
