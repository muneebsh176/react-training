
import NavBar from '../Navigation/NavBar'
import Commits from '../Commits/Commits'
import Summary from '../Summary/Summary'
import { useState } from 'react'
import { useRepos } from '../Api/GitHubApi'
import { Route, Switch } from "react-router-dom";

const Home = () => {
    const [page, setPage] = useState(1)
    const { repos, status } = useRepos(page)

    return (
        <div>
            <NavBar />
            {
                status !== "DONE" ?

                    <pre>Loading...</pre> :


                    <Switch>
                        <Route path="/commits" exact component={Commits} />
                        <Route path="/summary" exact
                            component={() =>
                                <Summary
                                    repos={repos}
                                    page={page}
                                    setPage={setPage}
                                />}
                        />
                    </Switch>
            }
        </div>
    )
}

export default Home