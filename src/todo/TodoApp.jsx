import React, {Component} from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
class TodoApp extends Component{
    render(){
        return(
            <div className="TodoApp">
                <Router>
                    <>
                        <Switch>
                            <Route path="/" exact component={LoginComponent}/>                   
                            <Route path="/login" component={LoginComponent}/>
                            <Route path="/welcome" component={WelcomeComponent}/>
                            <Route component={ErrorComponent}/>
                            </Switch>
                    </>
                </Router>


                {/* <LoginComponent></LoginComponent>
                <WelcomeComponent/> */}
            </div>
        )
    }
}
class WelcomeComponent extends Component{
    render() {
        return(
            <div>Welcome kalyan</div>
        )
    }
}
function ErrorComponent() {
    return <div>An Error Occurred,I don't know what to do! Contact support at </div>
}

class LoginComponent extends Component{
    constructor(props) {
        super(props)
        this.state={
            username: "kalyan",
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        this.handleChange=this.handleChange.bind(this);
        this.loginClicked=this.loginClicked.bind(this);
    }

    handleChange(event) {
        //console.log(event.target.value);
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    loginClicked(){ 
        if(this.state.username==='kalyan' && this.state.password==='')
        {
            this.props.history.push("/welcome")
            // this.setState({showSuccessMessage:true})
            // this.setState({hasLoginFailed:false})
        }
        else{
            console.log("Failed");
            this.setState({hasLoginFailed: true})
            this.setState({showSuccessMessage:false})
        }
            
        //console.log(this.state)
    }
    render() {
        return (
            <div>
                {/* <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/> */}
                {this.state.hasLoginFailed && <div>Invalid Credentials</div>}
                {this.state.showSuccessMessage && <div>Login Successful</div>}
                {/* <ShowSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/> */}
                User Name: <input type="text" value={this.state.username}  name="username" onChange={this.handleChange}/>
                Password: <input type="password" value={this.state.password} name="password" onChange={this.handleChange}/>
                <button onClick={this.loginClicked} >Login</button>
            </div>
        )

    }
    
}
// function ShowInvalidCredentials(props)
// {
//     if(props.hasLoginFailed){
//         return <div>Invalid Credentails</div>
//     }
//     return null
// }
// function ShowSuccessMessage(props)
// {
//     if(props.showSuccessMessage){
//         return <div>login Successful</div>
//     }
//     return null
// }
export default TodoApp;