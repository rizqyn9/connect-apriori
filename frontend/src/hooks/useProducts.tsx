import { atom, useAtom } from 'jotai'
import { useAxiosPrivate } from './useAxiosPrivate'
import create from 'zustand'
import { axiosPrivate } from '../services'
import { ProductInputSchema } from '../utils/zod.schema'

const atomProducts = atom([])

const useProductStore = create<ProductStore>((set, get) => ({
    products: [],
    async getAllProducts() {
        try {
            set({
                products: await axiosPrivate
                    .get<{ payload: ProductProps[] }>('/products')
                    .then((res) => res.data.payload)
                    .then((res) =>
                        res.map((data) => ({
                            ...data,
                            imageURL:
                                import.meta.env.VITE_SERVER +
                                '/' +
                                data.imageURL,
                        })),
                    ),
            })
        } catch (error: unknown) {
            Promise.reject(error)
        }
    },
    async getProductId(id: string) {
        try {
            return await axiosPrivate
                .get<{ payload: ProductProps }>(`/products/${id}`)
                .then((res) => res.data.payload)
        } catch (error) {
            return Promise.reject(error)
        }
    },
    async postProduct(product: unknown) {
        try {
            await axiosPrivate
                .post<{ payload: ProductProps }>('/products', product)
                .then()
        } catch (error) {
            return Promise.reject(error)
        }
    },
}))

export { atomProducts, useProductStore }
