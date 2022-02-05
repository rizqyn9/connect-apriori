import React, { useEffect, useState } from 'react'
import Table from '../components/Table'
import clsx from 'clsx'

export default function Analytics() {
    const [tabActive, setTabActive] = useState('Products')

    useEffect(() => {
        console.log(tabActive)
    }, [tabActive])

    return (
        <div className={'flex flex-col gap-8 h-full p-5'}>
            {/*Title*/}
            <div className={'h-[5rem] border-b-2 border-dark-line'}>
                <h1 className={'text-white font-bold text-2xl'}>Analitycs</h1>
            </div>
            <div className={'flex-auto flex flex-col gap-5'}>
                {/*Tabs Container*/}
                <div className={'flex gap-3 text-white'}>
                    <Tabs
                        text={'Products'}
                        tabActive={tabActive}
                        setTabActive={setTabActive}
                    />
                    <Tabs
                        text={'Transaction'}
                        tabActive={tabActive}
                        setTabActive={setTabActive}
                    />
                </div>
                <div
                    className={
                        'border-2 border-white overflow-hidden rounded-xl'
                    }
                >
                    <Table />
                </div>
            </div>
        </div>
    )
}

function Tabs({ text, tabActive, setTabActive }) {
    return (
        <button
            className={clsx(
                'rounded-md py-1 px-3 border-b-2  hover:bg-dark-2/50 transition',
                `${
                    tabActive === text
                        ? 'bg-primary pointer-events-none border-white font-bold'
                        : 'font-thin'
                }`
            )}
            onClick={() => setTabActive(text)}
        >
            <p>{text}</p>
        </button>
    )
}
