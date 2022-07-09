import React from 'react'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
import Icon from './Icon'
import { useOrderStore } from '../hooks/useOrder'
import { useOnClickOutside } from '../hooks/useClickOutside'

export default function Card({
    menu,
    imageURL,
    price,
    _id,
    activeCard,
    setActiveCard,
}: CardProductProps) {
    const navigate = useNavigate()
    const [menuType, setMenuType] = React.useState<MenuType>('hot')
    const ref = React.useRef<HTMLDivElement>(null)
    const { addOrder, orders } = useOrderStore()

    useOnClickOutside(ref, () => {
        setActiveCard('')
        ref.current
    })

    React.useEffect(() => {
        console.log(orders)
    }, [orders])

    const idWithVariant = `${menuType}-${_id}`

    return (
        <div
            className={clsx(
                'w-[12rem] h-[23rem] p-2 rounded-2xl flex flex-col gap-4 items-center justify-around bg-dark-2 relative',
                { 'shadow-active': activeCard },
            )}
            data-active={activeCard}
            onClick={() => setActiveCard(_id)}
            ref={ref}
        >
            {/* Edit Icon */}
            <button
                onClick={() => navigate(`product/${_id}`)}
                className="absolute top-5 hover:bg-primary cursor-pointer left-5 bg-gray-50 w-6 h-6 rounded-full z-10"
            ></button>

            <div className="w-full pt-[100%] relative bg-primary rounded-xl overflow-hidden">
                <img
                    src={imageURL}
                    className="absolute top-0 left-0"
                    alt="dummy"
                />
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
                <h2 className="text-lg">{menu}</h2>
                <p className="text-sm text-white/80">Rp. {price}</p>
            </div>
            <div className={'flex gap-5'}>
                <Variants setType={setMenuType} type={menuType} />
            </div>
            <button
                className="text-xs bg-primary p-2 w-full text-center rounded-lg hover:opacity-80"
                onClick={() => {
                    addOrder(idWithVariant, {
                        menuType,
                        menu,
                        price,
                        imageURL,
                        _id,
                    })
                }}
            >
                Add to billing
            </button>
        </div>
    )
}

type VariantProps = {
    setType: (type: MenuType) => void
    type: MenuType
}

function Variants({ setType, type }: VariantProps) {
    return (
        <>
            <div
                className={clsx(
                    'w-8 h-8 p-1 grid place-content-center rounded-md cursor-pointer',
                    type === 'hot'
                        ? 'bg-primary/50 text-white'
                        : 'bg-dark-1 text-[#f7a474]',
                )}
                onClick={() => setType('hot')}
            >
                <Icon.Hot />
            </div>
            <div
                className={clsx(
                    'w-8 h-8 p-1 grid place-content-center rounded-md cursor-pointer',
                    type === 'ice'
                        ? 'bg-primary/50 text-red-900'
                        : 'bg-dark-1 text-[#89f1f5]',
                )}
                style={{ color: 'cyan' }}
                onClick={() => setType('ice')}
            >
                <Icon.Ice />
            </div>
        </>
    )
}
