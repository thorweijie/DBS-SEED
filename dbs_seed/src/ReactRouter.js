import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
}    from 'react-router-dom'

export default BasicExample = () => {
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
                        <Link to = '/dashboard'>Dashboard</Link>
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
                    <Route path = '/dashboard'>
                        <Dashboard/>
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

let Dashboard = () =>
    <>
        <h2>Dashboard</h2>
    </>