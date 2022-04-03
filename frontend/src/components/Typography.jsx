import React from 'react'
import clsx from 'clsx'

const H1 = ({ children, className }) => {
    return (
        <h1 className={clsx('text-2xl font-bold mb-2', className)}>
            {children}
        </h1>
    )
}

export { H1 }
