
import NavBar from '../Navigation/NavBar'
import Commits from '../Commits/Commits'
import Summary from '../Summary/Summary'
import { Route, Switch } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/commits" exact component={Commits} />
                <Route path="/summary" exact component={Summary} />
            </Switch>
        </div>
    )
}

export default Home