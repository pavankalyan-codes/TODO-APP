import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService.js'

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
            AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password);
            this.props.history.push(`/welcome/${this.state.username}`)
            // this.setState({showSuccessMessage:true})
            // this.setState({hasLoginFailed:false})
        }
        else{
            console.log("Failed");
            this.setState({hasLoginFailed: true})
            //this.setState({showSuccessMessage:false})
        }
            
        //console.log(this.state)
    }
    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                    {/* <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/> */}
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Login Successful</div>}
                    {/* <ShowSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/> */}
                    User Name: <input type="text" value={this.state.username}  name="username" onChange={this.handleChange}/>
                    Password: <input type="password" value={this.state.password} name="password" onChange={this.handleChange}/>
                    <button className="btn btn-success" onClick={this.loginClicked} >Login</button>
                </div>
            </div>
        )

    }
    
}
export default LoginComponent