import React, { useEffect } from 'react'
import { atom, useAtom } from 'jotai'

const dataAtom = atom({
    quantity: 1,
    test: true,
})

function useData() {
    const [data, setData] = useAtom(dataAtom)

    const add = () => {
        setData({ ...data, quantity: (data.quantity += 1) })
    }

    return { add, data, setData }
}

export { dataAtom, useData }
