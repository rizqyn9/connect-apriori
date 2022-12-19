import clsx from 'clsx'

type ButtonProps = { size?: keyof typeof getSize } & React.ButtonHTMLAttributes<HTMLButtonElement>
export const Button = ({ type = 'button', size = 'md', ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      type={type}
      className={clsx('bg-primary rounded-md hover:opacity-80 disabled:bg-gray-400 transition-colors duration-200', getSize[size], props.className)}
    />
  )
}

const getSize = {
  sm: 'p-2 px-4 text-xs h-max w-max',
  md: 'p-2',
}
