import clsx from 'clsx'
import * as React from 'react'

function GridRow({ children, title, className }) {
    return (
        <div className={clsx('grid grid-row-8', className)}>
            {title && (
                <div className="row-start-1 border-b-2 border-red-700 min-h-[8rem]">
                    {title}
                </div>
            )}
            <div
                className={clsx({
                    'row-start-2 row-span-auto h-full': title,
                    'row-start-1 row-span-auto': !title,
                })}
            >
                {children}
            </div>
        </div>
    )
}

export { GridRow }
