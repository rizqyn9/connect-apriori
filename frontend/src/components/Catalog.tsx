import { useState, memo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useProductStore, useAuth, useOrderStore } from '@/hooks'
import { productService } from '@/services'
import Card from './Card'
import Order from './Order'
import { GridRow } from './Grid'
import { useToastStore } from './Toast'
import { Button } from './Button'
import { toIDR } from '@/utils/base64'

export default function Catalog() {
  const { addToast } = useToastStore()
  const { products } = useProductStore()
  const { cardId, addOrder, orders } = useOrderStore()
  const [activeCard, setActiveCard] = useState('')

  const productsQuery = useQuery(['products'], productService.getAll, {
    onSuccess: ({ success }) => success && addToast({ type: 'success', msg: 'Update catalog' }),
    refetchOnMount: false,
  })

  const productPromoQuery = useQuery(['products-promo'], productService.productPromo, {
    onSuccess: (data) => {
      console.log({ data })
    },
  })

  const refresh = () => {
    productsQuery.refetch()
    productPromoQuery.refetch()
  }

  return (
    <>
      <GridRow className="px-4 w-full text-sm" title={<Title />}>
        <div className="row-start-2 flex h-full py-8 flex-col gap-5">
          <Button className="w-max" onClick={refresh}>
            Refresh
          </Button>
          {!!cardId && (
            <div className="grid grid-cols-2">
              {productPromoQuery.data?.products.map((x, idx) => {
                const name = `packet-` + x._id
                const alreadyAdded = Object.keys(orders).includes(name)
                return (
                  <button
                    className="p-5 rounded-lg bg-dark-2 relative overflow-hidden"
                    key={idx}
                    disabled={alreadyAdded}
                    onClick={() => {
                      addOrder(name, {
                        _id: x._id,
                        imageURL: x.imageUrl,
                        menu: x.menu,
                        price: x.price,
                        orderId: '',
                        menuType: 'promo',
                      })
                    }}
                  >
                    <img src={x.imageUrl} className="absolute w-[180] opacity-20 left-0 top-0t" />
                    <p>{x.menu}</p>
                    <ul className="ml-3 py-2">
                      {x.productsList.map((y, i) => (
                        <li key={i}>{y.menu}</li>
                      ))}
                    </ul>
                    <p>{toIDR(x.price)}</p>
                  </button>
                )
              })}
            </div>
          )}
          <div className="flex-auto flex flex-wrap gap-2 align-start justify-start overflow-y-scroll h-full max-h-[75vh] p-1">
            {products?.map((val, i) => (
              <Card activeCard={activeCard == val._id} setActiveCard={setActiveCard} key={i} {...val} />
            ))}
          </div>
        </div>
      </GridRow>
      <GridRow title={<UserMemo />} className="bg-dark-2 overflow-y-auto max-h-screen-auto px-3 max-w-[24rem] hidden md:block">
        <Order className="h-full row-start-2 py-8" />
      </GridRow>
    </>
  )
}

function Title() {
  return (
    <div className="text-white flex flex-col justify-center h-full w-full">
      <h1 className="text-lg font-bold mb-2">Connect Coffee</h1>
      <p className="text-xs font-thin">{new Date().toLocaleDateString('id')}</p>
    </div>
  )
}

const UserMemo = memo(User)

function User() {
  const { signOut, authUser } = useAuth()

  return (
    <div className="h-full w-full flex items-center gap-6 text-sm bg-dark-2">
      <div className="h-[3.5rem] w-[3.5rem] overflow-hidden rounded-full">
        <img src="./src/static/images/dummy.jpg" alt="pics" />
      </div>
      <div className={'flex flex-1 flex-col gap-2'}>
        <h1 className="text-md font-bold">{authUser()?.name}</h1>
        <p className="text-xs font-thin opacity-70">{authUser()?.isAdmin ? 'Admin' : 'Casheer'}</p>
      </div>
      <Button className="justify-self-end py-1" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  )
}
