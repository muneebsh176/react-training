import Table from '../Tables/Table'
import React from 'react'
import { COLUMNS } from './columns'

const Summary = ({ repos, page, setPage, isLoading }) => {
  return (
    <React.Fragment>
      <Table
        repos={repos}
        attributes={COLUMNS}
        currentPage={page}
        totalPages={5}
        setPage={setPage}
        isLoading={isLoading}
      />
    </React.Fragment>
  )
}

export default Summary
