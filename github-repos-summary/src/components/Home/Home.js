
import NavBar from '../Navigation/NavBar'
import Commits from '../Commits/Commits'
import Summary from '../Summary/Summary'
import { useRepos } from '../Api/GitHubApi'
import { Route, Switch } from "react-router-dom";

const Home = () => {
    const { repos, status } = useRepos()

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
                                />}
                        />
                    </Switch>
            }
        </div>
    )
}

export default Home