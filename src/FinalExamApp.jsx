import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Main from '../src/onlineExamPortal/components/Main'
import Register from '../src/onlineExamPortal/components/Register'
import Login from '../src/onlineExamPortal/components/Login'
import HeaderComponent from '../src/onlineExamPortal/components/HeaderComponent'
import FooterComponent from '../src/onlineExamPortal/components/FooterComponent'
import SignIn from '../src/onlineExamPortal/components/SignIn'
import SignUp from '../src/onlineExamPortal/components/SignUp'
import Dashboard from '../src/onlineExamPortal/components/Dashboard'
import WriteExam from './exam/WriteExam'

class FinalExamApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                
                <Router>
                    <HeaderComponent></HeaderComponent>
                    <Route path="/" exact component={SignIn} />
                    <Route path="/signin" component={SignIn} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/login" component={Login} />
                    <Route path="/testing" component={WriteExam} />

                    <Route path="/dashboard" component={Dashboard}/>
                    <FooterComponent></FooterComponent>
                </Router>


                {/* <LoginComponent></LoginComponent>
                <WelcomeComponent/> */}
            </div>
        )
    }
}

export default FinalExamApp;