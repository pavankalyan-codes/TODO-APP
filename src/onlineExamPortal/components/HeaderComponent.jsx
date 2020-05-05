import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router'
class HeaderComponent extends Component{
    render(){
        //console.log(isUserLoggedIn);
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="/" className="navbar-brand"> Online Assessment Portal </a></div>
                        
                        
                </nav>
            </header>
            
        )
    }
}

export default withRouter(HeaderComponent);