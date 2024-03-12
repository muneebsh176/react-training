import React, { useMemo } from 'react'
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable
} from 'react-table'
import { GlobalFilter } from './GlobalFilter'
import './table.css'

const Table = ({
  repos,
  attributes,
  currentPage,
  totalPages,
  setPage,
  isLoading
}) => {
  const columns = useMemo(() => attributes, [attributes])
  const data = useMemo(() => repos, [repos])

  const tableInstance = useTable(
    {
      columns,
      data,
      useControlledState: (state) => {
        return useMemo(
          () => ({
            ...state,
            pageIndex: currentPage
          }),
          [state]
        )
      },
      initialState: { pageIndex: currentPage },
      manualPagination: true,
      pageCount: totalPages
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    pageOptions,
    prepareRow,
    state,
    setGlobalFilter
  } = tableInstance

  const { pageIndex, globalFilter } = state

  return (
    <div className="text-center">
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()} className={isLoading ? 'loading' : ''}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' ▼'
                        : ' ▲'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            return (
              <tr key={row.id} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td key={row.id} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="m-3">
        <span>
          Page{' '}
          <strong>
            {pageIndex} of {pageOptions.length}
          </strong>
        </span>
        <button
          className="mx-3"
          onClick={() => {
            setPage((s) => (s === 0 ? 0 : s - 1))
          }}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setPage((s) => s + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Table
