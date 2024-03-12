import { useEffect, useRef, useState } from 'react'

export const useRepos = (page, user) => {
  const [repos, setRepos] = useState([])
  const [status, setStatus] = useState('IDLE')
  const componentUnmounted = useRef(false)

  useEffect(() => {
    return () => {
      componentUnmounted.current = true
    }
  }, [])

  useEffect(() => {
    if (page && user) {
      const fetchData = () => {
        const REPOS_URL = `https://api.github.com/users/${user}/repos?per_page=10&page=${page}&type=public`

        console.log('Fetching Repos')
        setStatus('FETCHING')
        fetch(REPOS_URL)
          .then((res) => res.json())
          .then((repos) => {
            if (!componentUnmounted.current) {
              setRepos(repos)
            }
          })
          .catch(() => {})
          .finally(() => {
            if (!componentUnmounted.current) {
              setStatus('DONE')
            }
          })
      }

      fetchData()
    }
  }, [page, user])

  return { repos, status }
}

export const useCommits = (repo, user) => {
  const [commits, setCommits] = useState([])
  const [status, setStatus] = useState('IDLE')
  const componentUnmounted = useRef(false)

  useEffect(() => {
    return () => {
      componentUnmounted.current = true
    }
  }, [])

  useEffect(() => {
    if (repo && user) {
      const fetchData = () => {
        setStatus('FETCHING')
        const COMMITS_URL = `https://api.github.com/repos/${user}/${repo}/commits`
        fetch(COMMITS_URL)
          .then((res) => res.json())
          .then((commits) => {
            if (!componentUnmounted.current) {
              setCommits(commits)
            }
          })
          .catch(() => {})
          .finally(() => {
            if (!componentUnmounted.current) {
              setStatus('DONE')
            }
          })
      }

      fetchData()
    }
  }, [repo, user])

  return { commits, status }
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
