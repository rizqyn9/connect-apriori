import clsx from 'clsx'

type GridRowProps = {
    children: React.ReactNode
    title: string | React.ReactNode
    className: string
}

function GridRow({ children, title, className }: GridRowProps) {
    return (
        <div
            className={clsx(
                'grid w-full h-screen overflow-hidden relative',
                className,
            )}
            style={{ gridTemplateRows: '8rem auto' }}
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
