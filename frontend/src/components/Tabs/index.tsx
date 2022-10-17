import { Tab } from '@headlessui/react'
import clsx from 'clsx'

type ButtonTabProps = { label: string }

function ButtonTab({ label }: ButtonTabProps) {
    return (
        <Tab
            className={({ selected }: { selected: boolean }) =>
                clsx(
                    'w-full rounded-lg py-2 leading-5 text-md text-white font-bold',
                    'ring-primary ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2',
                    selected ? 'bg-primary shadow' : 'text-white hover:bg-white/[0.12] hover:text-white',
                )
            }
        >
            {label}
        </Tab>
    )
}

export { ButtonTab, Tab }
