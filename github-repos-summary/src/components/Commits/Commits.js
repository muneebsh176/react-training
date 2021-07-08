import React, { useState } from 'react';
import SelectPicker from '../Elements/SelectPicker';

const Commits = ({ repos }) => {

    const [selectedRepo, setSelectedRepo] = useState(repos[0])

    const onChangeRepo = (repo) => {
        setSelectedRepo(repo)
    }

    console.log(selectedRepo)

    return (
        <div className="m-3 text-center">
            <SelectPicker
                items={repos}
                defaultSelected={selectedRepo}
                onChange={onChangeRepo} />
        </div>
    );
}

export default Commits;