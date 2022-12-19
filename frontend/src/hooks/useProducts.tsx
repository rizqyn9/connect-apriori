import create from 'zustand'
import { ProductStore } from '@/types'

const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
}))

export { useProductStore }
