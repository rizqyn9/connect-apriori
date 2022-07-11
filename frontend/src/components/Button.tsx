import clsx from 'clsx'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
export const Button = (props: ButtonProps) => {
    return (
        <button
            {...props}
            className={clsx(
                'p-2 bg-primary rounded-md hover:opacity-80',
                props.className,
            )}
        />
    )
}
