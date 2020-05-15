import React,{ Component } from "react";
import moment from 'moment'
import '../../App.css' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import {  faTimesCircle } from '@fortawesome/free-solid-svg-icons'

class ResultsComponent extends Component
{
    render()
    {
        return(
            <div className="results">


               

                <table class="table table-bordered">
                <thead>
                    <tr>
                    <th scope="col">AssessmentID</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Attempted Date</th>
                    <th scope="col">
                        Correct answers
                        <span class="icon has-text-success">
                        <FontAwesomeIcon icon={faCheckCircle} className="myicon" />

                        

                        </span>
                    </th>
                    <th scope="col">
                        Incorrect answers
                        <span class="icon has-text-danger">
                        <FontAwesomeIcon icon={faTimesCircle} className="mywrongicon" />
                        </span>
                    </th>
                    <th scope="col">Total Score</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td >{this.props.AssessmentID}</td>
                    <td>{this.props.Subject}</td>
                    <td>{this.props.date}</td>
                    <td>{this.props.correct}</td>
                    <td>{this.props.incorrect}</td>
                    <td>{this.props.score}/{this.props.total}</td>
                    </tr>
                    
                </tbody>
                </table>
            </div>
        )
    }
}
export default ResultsComponent;