import React,{ Component } from "react";
import moment from 'moment'
import '../../App.css' 
import ResultsComponent from './ResultsComponent'


class Results extends Component{
    render(){
        return(
            <>
            <div class = "page-header" style={{marginLeft:"250px"}}>
            <h1>
                Attempted Assessments
                
            </h1>
            </div>
            <hr></hr>
            <ResultsComponent AssessmentID="MyExam001" Subject="OOAD" date={new Date} correct={15} incorrect={5} score={15} />
            <ResultsComponent AssessmentID="MyExam001" Subject="OOAD" date={new Date} correct={15} incorrect={5} score={15} />
            
            </>
            )
    }
}
export default Results