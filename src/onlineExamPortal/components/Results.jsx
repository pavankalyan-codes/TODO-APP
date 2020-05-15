import React,{ Component } from "react";
import moment from 'moment'
import '../../App.css' 
import ResultsComponent from './ResultsComponent'
import OAPAuthenticationService from './OAPAuthenticationService.js'


class Results extends Component{
    constructor(props)
    {
        super(props)
        this.state={
            scores:[]
        }
    }
    componentDidMount()
    {
        let userId=OAPAuthenticationService.getLoggedInUsername()
        OAPAuthenticationService.getScoresByStudentId(userId)
         .then(
             (response) =>{
                 console.log(response)
                 this.setState({
                    scores:response.data
                 },console.log("----in-----"+this.state.scores))
                    
             },console.log("----out-----"+this.state.scores)
         )
    }

    render(){
        console.log(this.state.scores);
        return(
            <div >
                <link href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.1/css/bulma.min.css" rel="stylesheet"/>

                <div class = "page-header" style={{marginLeft:"250px"}}>
                    <h1 className="title">
                        Attempted Assessments
                        
                    </h1>
                </div>
                <hr></hr>
                <div className="resultsDiv">


                            {
                                this.state.scores.map(
                                score =>
                                <ResultsComponent AssessmentID={score.examId} Subject="-" date={score.submittedDate } correct={score.correct} incorrect={score.incorrect} score={score.score} total={score.total} />

                                )
                            }





                  </div>
            </div>
            )
    }
}
export default Results