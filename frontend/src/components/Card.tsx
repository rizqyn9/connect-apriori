import React from 'react'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
import Icon from './Icon'
import { useOrderStore } from '../hooks/useOrder'
import { useOnClickOutside } from '../hooks/useClickOutside'
import { Button } from './Button'

export default function Card(props: CardProductProps) {
    const { menu, imageURL, price, _id, activeCard, setActiveCard } = props
    const navigate = useNavigate()
    const [menuType, setMenuType] = React.useState<MenuType>('hot')
    const ref = React.useRef<HTMLDivElement>(null)
    const { addOrder } = useOrderStore()

    useOnClickOutside(ref, () => setActiveCard(''))

    const handleAddOrder = React.useCallback(() => {
        addOrder(idWithVariant, {
            orderId: idWithVariant,
            menuType,
            menu,
            price,
            imageURL,
            _id,
        })
    }, [menuType, props])

    const handleEdit = React.useCallback(() => {
        navigate(`product/${_id}`)
    }, [_id])

    const idWithVariant = `${menuType}-${_id}`

    return (
        <div
            className={clsx(
                'w-[8rem] h-[17rem] p-2 rounded-2xl flex flex-col items-center justify-between bg-dark-2 relative overflow-hidden',
                { 'shadow-md': activeCard },
            )}
            data-active={activeCard}
            onClick={() => setActiveCard(_id)}
            ref={ref}
        >
            {/* Edit Icon */}
            <button
                onClick={handleEdit}
                className="absolute top-0 hover:bg-primary cursor-pointer left-0 bg-gray-50 h-5 px-4 rounded-br-md z-[2] text-primary hover:text-white"
                children={'Edit'}
            />
            <div className="w-full pt-[100%] relative bg-primary rounded-xl overflow-hidden">
                <img src={imageURL} className="absolute inset-0" alt="dummy" />
            </div>
            <h2 className="text-sm">{menu}</h2>
            <p className="text-xs text-white/80">Rp. {price}</p>
            <div className={'flex gap-2'}>
                <Variants setType={setMenuType} type={menuType} />
            </div>
            <Button onClick={handleAddOrder} className="text-xs w-full py-2">
                Add to billing
            </Button>
        </div>
    )
}

type VariantProps = {
    setType(type: MenuType): void
    type: MenuType
}

function Variants({ setType, type }: VariantProps) {
    return (
        <>
            <button
                className={clsx(
                    'w-7 h-7 p-1 grid bg-dark-1 place-content-center rounded-md cursor-pointer',
                    type == 'hot'
                        ? '!bg-primary/50 text-white'
                        : ' text-[#f7a474]',
                )}
                onClick={() => setType('hot')}
                children={<Icon.Hot />}
            />
            <button
                className={clsx(
                    'w-7 h-7 bg-dark-1 p-1 grid place-content-center rounded-md cursor-pointer',
                    type === 'ice'
                        ? '!bg-primary/50 text-red-900'
                        : ' text-[#89f1f5]',
                )}
                style={{ color: 'cyan' }}
                onClick={() => setType('ice')}
                children={<Icon.Ice />}
            />
        </>
    )
}
