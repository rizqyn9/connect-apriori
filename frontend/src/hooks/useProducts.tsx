import create from 'zustand'
import { axiosPrivate } from '../services'
import { AxiosError } from 'axios'

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
            console.log(product)
            return await axiosPrivate
                .post<{
                    payload: { menu: string; price: number; image: File }
                }>('/products', product)
                .then((res) => {
                    console.log(res)
                    return Promise.resolve(
                        `Success create new menu ${res.data.payload.menu}`,
                    )
                })
                .catch((err: AxiosError) =>
                    Promise.reject(err.response?.data.err ?? 'Server error'),
                )
        } catch (error) {
            return Promise.reject(error)
        }
    },
}))

export { useProductStore }
