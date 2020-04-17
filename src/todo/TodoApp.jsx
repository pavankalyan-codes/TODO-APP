import React, {Component} from 'react'
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'

class TodoApp extends Component{
    render(){
        return(
            <div className="TodoApp">
                <Router>
                    <>
                        <HeaderComponent/>
                        <Switch>
                            <Route path="/" exact component={LoginComponent}/>                   
                            <Route path="/login" component={LoginComponent}/>
                            <Route path="/welcome/:name" component={WelcomeComponent}/>
                            <Route path="/todos" component={ListTodosComponent}/>
                            <Route path="/logout" component={LogoutComponent}/>
                            <Route component={ErrorComponent}/>

                        </Switch>
                        <FooterComponent/>
                    </>
                </Router>


                {/* <LoginComponent></LoginComponent>
                <WelcomeComponent/> */}
            </div>
        )
    }
}
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
class FooterComponent extends Component{
    render(){
        return (
            <footer className="footer">
                <span className="textmuted">All Rights Reserved 2018@kalyan</span>
            </footer>
        )
    }
}
class LogoutComponent extends Component{
    render(){
        return (
            <div>
                <h1>You are logged out</h1>
                <div className="container">
                    Thank you for Using Our Application
                </div>
            </div>
        )
    }
}
class ListTodosComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            todos : 
            [
                {id:1,description: 'Learn to dance',done:false,targetDate: new Date()},
                {id:2,description: 'This to shall pass',done:false,targetDate: new Date()},
                {id:3,description: 'Be a fucking king',done:false,targetDate: new Date()}
            ]
        }
    }
    render() {
        return(
            <div>
                <h1>List Todos</h1>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Is Completed</th>
                                <th>Target Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map(
                                todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
class WelcomeComponent extends Component{
    render() {
        return(
            <>
                <h1>Welcome!</h1>
                <div className="container">
                Welcome {this.props.match.params.name} .You can manage your todos <Link to="/todos">here</Link>
                </div>
            </>

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