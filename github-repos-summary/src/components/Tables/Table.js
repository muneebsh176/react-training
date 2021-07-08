import React, { useMemo } from "react";
import { useTable, useSortBy } from 'react-table'
import './table.css'

const Table = ({ repos, attributes }) => {

    console.log(repos)

    const columns = useMemo(() => attributes, [attributes])
    const data = useMemo(() => repos, [repos])

    const tableInstance = useTable({
        columns,
        data
    }, useSortBy)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        footerGroups
    } = tableInstance

    return (
        <table {...getTableProps()}>
            <thead>
                {
                    headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map((column) => (

                                    <th
                                        {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted ?
                                                (column.isSortedDesc ? ' ▼' : ' ▲') : ''}
                                        </span>
                                    </th>


                                ))}

                        </tr>

                    ))
                }

            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    rows.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map((cell) => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })
                                }

                            </tr>
                        )

                    })
                }
            </tbody>
            <tfoot>
                {
                    footerGroups.map((footerGroup) => {
                        return (
                            <tr {...footerGroup.getFooterGroupProps()}>
                                {
                                    footerGroup.headers.map((column) => {

                                        return (
                                            <td {...column.getFooterProps()}>
                                                {
                                                    column.render('Footer')
                                                }
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                        )
                    })

                }
            </tfoot>
        </table>
    );
}

export default Table