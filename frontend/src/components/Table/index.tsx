import clsx from 'clsx'
import { HTMLAttributes } from 'react'

type THProps = HTMLAttributes<HTMLTableCellElement>
const TH = ({ className, ...rest }: THProps) => <th {...rest} className={clsx('border-2 border-white py-3', className)} />

type TRProps = HTMLAttributes<HTMLTableRowElement>
const TR = ({ className, ...rest }: TRProps) => <tr {...rest} className={clsx('even:bg-primary/30', className)} />

type TDProps = HTMLAttributes<HTMLTableCellElement> & {
    width?: string | number
    colSpan?: number
    center?: boolean
}
const TD = ({ className, center, ...rest }: TDProps) => <td {...rest} className={clsx('p-2', { 'text-center': center }, className)} />

export { TH, TR, TD }
export * from './TableAnalyticProduct'
export * from './TableAnalyticPromo'
export * from './TableAnalyticTransaction'

export * from './Table'
