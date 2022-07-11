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
}

export { GridRow }
