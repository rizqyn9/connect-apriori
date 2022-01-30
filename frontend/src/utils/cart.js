import { atom, useAtom } from 'jotai'

export const OrderEnum = Object.freeze({
    ADD: 0,
    REMOVE: 1,
})

let dummy = {
    ['id']: {},
}

export const OrderControlContext = atom({})

export function useOrder() {
    // if (!action || !data) return
    //
    // // useAtom(OrderControlContext)
    // switch (action) {
    //     case OrderEnum.ADD: {
    //         console.log('add :', data)
    //     }
    // }
    const test = () => {
        console.log('test')
    }

    return { test }
}
