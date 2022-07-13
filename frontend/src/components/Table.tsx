import { useTable, UseTableOptions, Column } from 'react-table'
import clsx from 'clsx'

type TableProps<D extends object = object> = UseTableOptions<D>

export default function Table({ columns, data }: TableProps) {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data })

    return (
        <table {...getTableProps()} className={'bg-dark-2 w-full text-white'}>
            <thead className={'bg-primary'}>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th
                                {...column.getHeaderProps()}
                                className={
                                    'py-2 px-5 text-left border-2 border-dark-line'
                                }
                            >
                                <>{column.render('Header')}</>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr
                            {...row.getRowProps()}
                            className={clsx(
                                `${i % 2 === 0 ? 'bg-dark-2' : 'bg-dark-1'}`,
                            )}
                        >
                            {row.cells.map((cell) => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        className={
                                            'px-4 py-2 border-2 border-dark-line'
                                        }
                                    >
                                        <>{cell.render('Cell')}</>
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
