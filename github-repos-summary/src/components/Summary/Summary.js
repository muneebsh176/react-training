import Table from '../Tables/Table'
import React from 'react'
import { COLUMNS } from '../Summary/columns'

const Summary = ({ repos }) => {

    return (
        <React.Fragment>
            <Table repos={repos} attributes={COLUMNS} />
        </React.Fragment>
    )
}

export default Summary