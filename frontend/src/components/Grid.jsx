import clsx from 'clsx'
import * as React from 'react'

function GridRow({ children, title, className }) {
    return (
        <div
            className={clsx('grid w-full h-full relative', className)}
            style={{
                gridTemplateRows: '8rem auto',
            }}
        >
            {title && (
                <div className="row-start-1 border-b-2 border-dark-line h-[8rem] w-full">
                    {title}
                </div>
            )}
            {children}
        </div>
    )
}

export { GridRow }
