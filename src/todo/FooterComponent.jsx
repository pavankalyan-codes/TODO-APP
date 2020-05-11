import React, {Component} from 'react'
import {withRouter} from 'react-router'

class FooterComponent extends Component{
    render(){
        return (
            <footer className="footer">
                <span className="textmuted">All Rights Reserved 2020@kalyan</span>
            </footer>
        )
    }
}

export default withRouter(FooterComponent)