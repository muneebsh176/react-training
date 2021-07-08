import React, { useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter } from 'react-table'
import { GlobalFilter } from "./GlobalFilter";
import './table.css'


const Table = ({ repos, attributes }) => {

    const columns = useMemo(() => attributes, [attributes])
    const data = useMemo(() => repos, [repos])

    const tableInstance = useTable({
        columns,
        data
    }, useGlobalFilter, useSortBy)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        footerGroups,
        state,
        setGlobalFilter
    } = tableInstance

    const { globalFilter } = state

    return (
        <div className="text-center">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
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
        </div>
    );
}

export default Table