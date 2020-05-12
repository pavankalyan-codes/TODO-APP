import React,{ Component } from "react";
import moment from 'moment'
import '../../App.css' 

class ResultsComponent extends Component
{
    render()
    {
        return(
            <div className="results">


               
                    <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>

                <table class="table table-bordered">
                <thead>
                    <tr>
                    <th scope="col">AssessmentID</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Attempted Date</th>
                    <th scope="col">
                        Correct answers
                        <span class="icon has-text-success">
                        <i class="fas fa-check-circle myicon"></i>
                        </span>
                    </th>
                    <th scope="col">
                        Incorrect answers
                        <span class="icon has-text-danger">
                        <i class="fas fa-times-circle mywrongicon"></i>
                        </span>
                    </th>
                    <th scope="col">Total Score</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td >{this.props.AssessmentID}</td>
                    <td>{this.props.Subject}</td>
                    <td>{moment(this.props.date).format('DD-MM-YYYY HH:mm:ss ')}</td>
                    <td>{this.props.correct}</td>
                    <td>{this.props.incorrect}</td>
                    <td>{this.props.score}/{this.props.correct+this.props.incorrect}</td>
                    </tr>
                    
                </tbody>
                </table>
            </div>
        )
    }
}
export default ResultsComponent;