import { useEffect, useState } from "react";


const COMMITS_URL =
    "https://api.github.com/repos/fabpot/{repo}/commits"


export const useRepos = (page) => {
    const [repos, setRepos] = useState(undefined);
    const [status, setStatus] = useState("IDLE")

    useEffect(() => {

        const fetchData = () => {
            const REPOS_URL =
                `https://api.github.com/users/fabpot/repos?per_page=10&page=${page}&type=public`;

            console.log("Fetching Repos")
            setStatus("FETCHING")
            fetch(REPOS_URL)
                .then((res) => res.json())
                .then((repos) => {
                    setRepos(repos)
                })
                .catch(() => { })
                .finally(() => setStatus("DONE"))
        }

        fetchData()

    }, [page]);


    return { repos, status };
};

export const useCommits = (repo) => {
    const [commits, setCommits] = useState(undefined);
    const [status, setStatus] = useState("IDLE")

    useEffect(() => {

        const fetchData = () => {
            setStatus("FETCHING")
            fetch(COMMITS_URL.replace("{repo}", repo))
                .then((res) => res.json())
                .then((commits) => {
                    setCommits(commits)
                })
                .catch(() => { })
                .finally(() => setStatus("DONE"))
        }

        fetchData()

    }, [repo]);


    return { commits, status };
}

// export const useReposCommits = () => {

//     const { repos, status: reposStatus } = useRepos()
//     const [reposCommits, setReposCommits] = useState([])
//     const [status, setStatus] = useState("IDLE")

//     useEffect(() => {

//         if (reposStatus === "DONE") {

//             let reposName = getAttributesList(repos, "name")

//             setStatus("FETCHING")

//             const fetchData = (repoName) => {
//                 setStatus("FETCHING")
//                 fetch(COMMITS_URL.replace('{repo}', repoName))
//                     .then((res) => res.json())
//                     .then((commits) => {
//                         const updatedReposCommits = reposCommits.filter(
//                             repoCommits => repoCommits.repo !== repoName);
//                         updatedReposCommits.push({ "repo": repoName, "commits": commits.length })
//                         setReposCommits(updatedReposCommits)
//                     })
//                     .catch((error) => console.log(error))
//                     .finally(() => {
//                         setStatus("DONE")
//                     })
//             }

//             for (let repoName of reposName) {
//                 fetchData(repoName)
//             }


//         }

//     }, [repos, reposStatus, reposCommits]);


//     return { reposCommits, status }

// }