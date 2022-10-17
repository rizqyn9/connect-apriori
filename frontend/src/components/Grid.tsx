import clsx from 'clsx'
import React from 'react'
import { motion } from 'framer-motion'
import { H1 } from './Typography'

type GridRowProps = {
    children: React.ReactNode
    title: string | React.ReactNode
    className?: string
}

const GridRow = React.forwardRef<HTMLDivElement, GridRowProps>(({ children, title, className }, ref) => {
    return (
        <div
            ref={ref}
            className={clsx('grid w-full h-screen max-h-screen overflow-hidden relative', className)}
            style={{ gridTemplateRows: '4rem auto' }}
        >
            {title && (
                <div className="row-start-1 border-b border-dark-line h-[5rem] w-full">
                    {typeof title != 'string' ? (
                        title
                    ) : (
                        <div className="flex flex-col justify-center h-full w-full">
                            <H1>{title}</H1>
                        </div>
                    )}
                </div>
            )}
            {children}
        </div>
    )
})

const GridRowMotion = motion(GridRow)

export { GridRow, GridRowMotion }
