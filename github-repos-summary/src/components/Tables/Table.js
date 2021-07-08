import React, { useMemo } from "react";
import { useTable } from 'react-table'
import './table.css'

const Table = ({ repos, attributes }) => {

    console.log(repos)

    const columns = useMemo(() => attributes, [])
    const data = useMemo(() => repos, [])

    const tableInstance = useTable({
        columns,
        data
    })

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
                    headerGroups.map((headerGroup) => {
                        return (<tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map((column) => {
                                    return (<th {...column.getHeaderProps()}>
                                        {column.render('Header')}
                                    </th>)

                                })
                            }

                        </tr>)

                    })
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