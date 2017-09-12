import React from 'react';
import Main from './Components/Main';
import Posts from './Components/Posts';
import Gallery from './Components/Gallery';
import Users from './Components/Users';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'


const App = () => (
    <Router>
        <div>
            <nav className="navbar navbar-inverse text-center" >
                <div className="container text-center">
                    <ul className="nav navbar-nav" id="navigation">
                        <li><Link to ="/posts">Posts</Link></li>
                        <li><Link to ="/gallery">Gallery</Link></li>
                        <li><Link to ="/users">Users</Link></li>
                    </ul>
                </div>
            </nav>

            <Route exact={true} path="/" component={Main}/>
            <Route exact={true} path="/posts" component={Posts}/>
            <Route exact={true} path="/gallery" component={Gallery}/>
            <Route exact={true} path="/users" component={Users}/>
        </div>
    </Router>
);

export default App;
