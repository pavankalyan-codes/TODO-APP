import React, {Component} from 'react'
import {BrowserRouter as Link} from 'react-router-dom'

class WelcomeComponent extends Component{
    constructor(props){
        super(props)
        this.retrieveWelcomeMessage=this.retrieveWelcomeMessage.bind(this)
    }
    render() {
        return(
            <>
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome {this.props.match.params.name} 
                    .You can manage your todos <Link to="/todos">here</Link>
                </div>
                <div className="container">
                    Clickhere to get a customized welcome message.
                    <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Get Welcome</button>
                </div>
            </>

        )
    }
    retrieveWelcomeMessage() {
        console.log("clicked");
    }
}

export default WelcomeComponent