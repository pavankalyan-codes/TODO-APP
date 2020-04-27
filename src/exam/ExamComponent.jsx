import React,{ Component } from "react";
import {BrowserRouter as Router,Route} from 'react-router-dom'
import WriteExam from './WriteExam'
class ExamComponent extends Component
{
    render(){
        return(
            <Router>
                <Route path="/" exact component={WriteExam}/>     
            </Router>
            
        )
    }
}
export default ExamComponent;