import clsx from 'clsx'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
export const Button = ({ type = 'button', ...props }: ButtonProps) => {
    return (
        <button
            {...props}
            type={type}
            className={clsx(
                'p-2 bg-primary rounded-md hover:opacity-80',
                props.className,
            )}
        />
    )
}
