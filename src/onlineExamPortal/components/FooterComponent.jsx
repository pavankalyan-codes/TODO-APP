import React, {Component} from 'react'
import {withRouter} from 'react-router'

class FooterComponent extends Component{
    render(){
        if (window.location.pathname ==='/signin' || window.location.pathname ==='/signup' || window.location.pathname ==='/')  
        {
            return (
                <footer className="myfooter">
                    <span className="textmuted">All Rights Reserved 2020@Online Assessment Portal</span>
                </footer>
            )
        }
        return null;
        
    }
}

export default withRouter(FooterComponent)