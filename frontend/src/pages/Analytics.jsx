import React from 'react'
import Table from '../components/Table'

export default function Analytics() {
    return (
        <div className={'flex flex-col h-full p-8'}>
            <h1 className={'text-white font-bold text-2xl'}>Analitycs</h1>
            <hr className={'border-2 border-dark-line my-7'} />
            <div className={'flex-auto'}>
                <Table />
            </div>
        </div>
    )
}
