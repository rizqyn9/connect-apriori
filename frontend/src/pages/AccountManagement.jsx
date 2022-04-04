import React from 'react'
import { GridRow } from '../components/Grid'
import { H1 } from '../components/Typography'

export default function AccountManagement() {
    return (
        <GridRow
            className={'px-5 w-full flex-auto'}
            title={
                <div className="text-white flex flex-col justify-center h-full w-full">
                    <H1>Account Management</H1>
                </div>
            }
        ></GridRow>
    )
}
