import React, {Component} from 'react'
import {BrowserRouter as Link} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'
import {withRouter} from 'react-router'
class HeaderComponent extends Component{
    render(){
        const isUserLoggedIn=AuthenticationService.isUserLoggedIn();
        //console.log(isUserLoggedIn);
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="https://www.twitter.com/rgvhater" className="navbar-brand"> kalyan</a></div>
                        <ul className="navbar-nav">
                            {isUserLoggedIn && <li ><Link className="nav-link" to="/welcome/kalyan">Home</Link></li>}
                            {isUserLoggedIn && <li ><Link className="nav-link" to="/todos">Todos</Link></li>}
                        </ul>
                        <ul className="navbar-nav navbar-collapse justify-content-end">
                            {!isUserLoggedIn && <li ><Link className="nav-link" to="/login">Login</Link></li>}
                            {isUserLoggedIn && <li ><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                        </ul>
                </nav>
            </header>
            
        )
    }
}

export default withRouter(HeaderComponent);