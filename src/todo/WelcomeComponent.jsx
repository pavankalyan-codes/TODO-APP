import React, {Component} from 'react'
import {BrowserRouter as Link} from 'react-router-dom'
import HelloWorldService from '../api/todo/HelloWorldService.js'
class WelcomeComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            welcomeMessage:''
        }
        this.retrieveWelcomeMessage=this.retrieveWelcomeMessage.bind(this)
        this.handleSuccessfulResponse=this.handleSuccessfulResponse.bind(this)
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
                <div className="container">
                    {this.state.welcomeMessage}
                </div>
            </>

        )
    }
    retrieveWelcomeMessage() {
        HelloWorldService.executeHelloWorldService()
        .then(response => this.handleSuccessfulResponse(response))
        //.catch()
    }

    handleSuccessfulResponse(response){
        this.setState({
            welcomeMessage:response.data
        })
    }
}

export default WelcomeComponent