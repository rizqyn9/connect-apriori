import clsx from 'clsx'
import React from 'react'
import { motion } from 'framer-motion'

type GridRowProps = {
    children: React.ReactNode
    title: string | React.ReactNode
    className: string
}

const GridRow = React.forwardRef<HTMLDivElement, GridRowProps>(
    ({ children, title, className }, ref) => {
        return (
            <div
                ref={ref}
                className={clsx(
                    'grid w-full h-screen max-h-screen overflow-hidden relative',
                    className,
                )}
                style={{ gridTemplateRows: '4rem auto' }}
            >
                {title && (
                    <div className="row-start-1 border-b border-dark-line h-[5rem] w-full">
                        {title}
                    </div>
                )}
                {children}
            </div>
        )
    },
)

const GridRowMotion = motion(GridRow)

export { GridRow, GridRowMotion }
