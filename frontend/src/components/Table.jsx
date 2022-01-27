import React from 'react'
import { useTable } from 'react-table'

export default function Table() {
    const data = React.useMemo(
        () => [
            {
                col1: 'Hello',
                col2: 'World',
            },
            {
                col1: 'react-table',
                col2: 'rocks',
            },
            {
                col1: 'whatever',
                col2: 'you want',
            },
        ],

        []
    )

    const columns = React.useMemo(
        () => [
            {
                Header: 'Column 1',
                accessor: 'col1', // accessor is the "key" in the data
            },
            {
                Header: 'Column 2',
                accessor: 'col2',
            },
        ],

        []
    )
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data })

    return (
        <table
            {...getTableProps()}
            className={'bg-dark-2 text-white rounded-xl overflow-hidden'}
        >
            <thead className={'bg-primary'}>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th
                                {...column.getHeaderProps()}
                                className={'py-2 px-5'}
                            >
                                {column.render('Header')}
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
                            className={`${
                                i % 2 === 0 ? 'bg-dark-2' : 'bg-dark-1'
                            }`}
                        >
                            {row.cells.map((cell) => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        className={'px-4 py-2'}
                                    >
                                        {cell.render('Cell')}
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
