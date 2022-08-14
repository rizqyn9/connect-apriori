import clsx from 'clsx'

type ButtonProps = { size?: keyof typeof getSize } & React.ButtonHTMLAttributes<HTMLButtonElement>
export const Button = ({ type = 'button', size = 'md', ...props }: ButtonProps) => {
    return <button {...props} type={type} className={clsx('bg-primary rounded-md hover:opacity-80', getSize[size], props.className)} />
}

const getSize = {
    sm: 'p-2 px-4 text-xs h-max w-max',
    md: 'p-2',
}
