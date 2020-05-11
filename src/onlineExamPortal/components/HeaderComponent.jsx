import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router'
class HeaderComponent extends Component{
    render(){
        //console.log(isUserLoggedIn);
        if (window.location.pathname === '/signin' || window.location.pathname ==='/signup' || window.location.pathname ==='/') 
        {
            return (
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div><a href="/" className="navbar-brand"> Online Assessment Portal </a></div>
                            
                            
                    </nav>
                </header>
                
            )
        }
        else    
        {
            return null;
        }
    }
}

export default withRouter(HeaderComponent);