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
import fullscreen from '../src/onlineExamPortal/components/fullscreen'
import Home from '../src/onlineExamPortal/components/Home'
import Exams from '../src/onlineExamPortal/components/Exams'
import Results from '../src/onlineExamPortal/components/Results'
import Profile from '../src/onlineExamPortal/components/Profile'
import Logout from '../src/onlineExamPortal/components/Logout'
import CreateExam from '../src/onlineExamPortal/components/CreateExam'


import WriteExam from './exam/WriteExam'
import Timer from './exam/Timer'
import Modal from './exam/modal'
import ExamReport from './exam/ExamReport'
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
                    <Route path="/testing"  component={WriteExam} />
                    <Route path="/examreport" component={ExamReport} />
                    <Route path="/modal" component={Modal} />
                    <Route path="/home" component={Dashboard}/>
                    <Route path="/exams" component={Dashboard}/>
                    <Route path="/results" component={Dashboard}/>
                    <Route path="/profile" component={Dashboard}/>
                    <Route path="/createExam" component={CreateExam}/>

                    <FooterComponent></FooterComponent>
                </Router>


                {/* <LoginComponent></LoginComponent>
                <WelcomeComponent/> */}
            </div>
        )
    }
}

export default FinalExamApp;