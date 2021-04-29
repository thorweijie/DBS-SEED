import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
}    from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to = '/'>Home</Link>
                    </li>
                    <li>
                        <Link to = '/about'>About</Link>
                    </li>
                    <li>
                        <Link to = '/topics'>Topics</Link>
                    </li>
                </ul>
                <hr/>

                <Switch>
                    <Route exact path = '/'>
                        <Home/>
                    </Route>
                    <Route path = '/about'>
                        <About/>
                    </Route>
                    <Route path = '/topics'>
                        <Topics/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

let Home = () =>
    <>
        <h2>Home</h2>
    </>

let About = () =>
    <>
        <h2>About</h2>
    </>

let Topics = () => {
    let {path, url} = useRouteMatch();
    return (
    <>
        <h2>Topics</h2>
        <ul>
            <li>
                <Link to = {`${url}/rendering`}>Rendering with React</Link>
            </li>
            <li>
                <Link to = {`${url}/components`}>Components</Link>
            </li>
            <li>
                <Link to = {`${url}/props-v-state`}>Props v. State</Link>
            </li>
        </ul>

        <Switch>
            <Route exact path = {path}>
                Please select a topic
            </Route>
            <Route path = {`${path}/:topicId`}>
                <Topic/>
            </Route>
        </Switch>
    </>
    )
}

let Topic = () => {
    let {topicId} = useParams();
    return (
    <>
        <h3>{topicId}</h3>
    </>
    )
}

export default App