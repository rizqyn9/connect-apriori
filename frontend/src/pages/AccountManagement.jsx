import React from 'react'
import { GridRow } from '../components/Grid'

export default function AccountManagement() {
    return (
        <GridRow
            className={'px-5 w-full flex-auto'}
            title={
                <div className="text-white flex flex-col justify-center h-full w-full">
                    <h1 className="text-2xl font-bold mb-2">
                        Account Management
                    </h1>
                </div>
            }
        ></GridRow>
    )
}
