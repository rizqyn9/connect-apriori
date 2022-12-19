import { ReactNode } from 'react'
import clsx from 'clsx'

type TextProps = {
  children: ReactNode
  className?: string
}

const H1 = ({ children, className }: TextProps) => {
  return <h1 className={clsx('text-2xl font-bold mb-2', className)}>{children}</h1>
}

export { H1 }
