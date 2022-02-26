import { useAxiosPrivate } from './useAxiosPrivate'

function useProducts() {
    const axiosPrivate = useAxiosPrivate()

    const getAllProducts = async () => {
        return await axiosPrivate.get('/products')
    }

    return { getAllProducts }
}

export { useProducts }
