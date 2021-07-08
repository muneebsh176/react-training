import React, { useState, useEffect } from 'react';
import { useCommits } from '../Api/GitHubApi';
import SelectPicker from '../Elements/SelectPicker';
import Line from '../Graphs/Line';

const Commits = ({ repos, isLoading }) => {

    const [selectedRepo, setSelectedRepo] = useState(repos[1])
    const { commits, status } = useCommits(selectedRepo)
    const [monthlyCommits, setMonthlyCommits] = useState([
        {
            "id": selectedRepo,
            "color": "hsl(135, 70%, 50%)",
            "data": []
        }
    ])

    const onChangeRepo = (repo) => {
        setSelectedRepo(repo)
    }

    useEffect(() => {
        if (!isLoading && status === "DONE") {
            const monthlyCommitsData = {}
            commits.forEach((commit) => {
                // splitting datetime by '-' to get year and month
                const dateTime = commit.commit.author.date.split("-");
                const year = dateTime[0];
                const month = dateTime[1];
                let x = "";
                x = year + "-" + month;
                if (x in monthlyCommitsData) {
                    monthlyCommitsData[x] += 1;
                } else {
                    monthlyCommitsData[x] = 1;
                }
            });

            const monthlyCommitsTemp = []
            // transforming data for Line component
            Object.keys(monthlyCommitsData).forEach((key) => {
                monthlyCommitsTemp.push({
                    x: key, y: monthlyCommitsData[key]
                });
            });

            setMonthlyCommits([
                {
                    "id": selectedRepo,
                    "color": "hsl(135, 70%, 50%)",
                    "data": monthlyCommitsTemp
                }
            ])
        }
    }, [isLoading, commits, status, selectedRepo])

    return (
        <div className="m-3 text-center">
            {
                !isLoading && status !== "DONE" ?
                    <pre>Loading...</pre> :
                    <div style={{ height: 500 }}>
                        <SelectPicker
                            items={repos}
                            defaultSelected={selectedRepo}
                            onChange={onChangeRepo} />
                        <Line
                            data={monthlyCommits}
                            xLabel={"Month"}
                            yLabel={"Count"}
                            isLoading={isLoading}
                        />
                    </div>
            }
        </div>
    );
}

export default Commits;