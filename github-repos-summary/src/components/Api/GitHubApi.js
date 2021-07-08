import { useEffect, useState } from "react";
import { getAttributesList } from '../../utils'


const REPOS_URL =
    "https://api.github.com/users/muneebsh176/repos?per_page=1&type=public&sort=updated";

const COMMITS_URL =
    "https://api.github.com/repos/muneebsh176/{repo}/commits"


export const useRepos = () => {
    const [repos, setRepos] = useState(undefined);
    const [status, setStatus] = useState("IDLE")

    useEffect(() => {

        const fetchData = () => {
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

    }, []);


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

export const useReposCommits = () => {

    const { repos, status: reposStatus } = useRepos()
    const [reposCommits, setReposCommits] = useState([])
    const [status, setStatus] = useState("IDLE")

    useEffect(() => {

        if (reposStatus === "DONE") {


            let reposName = getAttributesList(repos, "name")

            setStatus("FETCHING")

            const fetchData = (repoName) => {
                setStatus("FETCHING")
                fetch(COMMITS_URL.replace('{repo}', repoName))
                    .then((res) => res.json())
                    .then((commits) => {
                        const updatedReposCommits = reposCommits.filter(
                            repoCommits => repoCommits.repo !== repoName);
                        updatedReposCommits.push({ "repo": repoName, "commits": commits.length })
                        setReposCommits(updatedReposCommits)
                    })
                    .catch((error) => console.log(error))
                    .finally(() => {
                        if (repos.length === reposCommits.length) {
                            setStatus("DONE")
                        }
                    })
            }

            for (let repoName of reposName) {
                fetchData(repoName)
            }


        }

    }, [repos, reposStatus]);


    return { reposCommits, status }

}