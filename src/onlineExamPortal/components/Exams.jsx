import React,{ Component } from "react";
import examImg from '/home/kalyantvk/Documents/backup/TODO-APP/src/exam/exam.jpg'
import moment from 'moment'
import { SupervisorAccount } from "material-ui-icons";
import '../../App.css' 
import queryString from 'query-string'
import { trackPromise } from 'react-promise-tracker';

import OAPAuthenticationService from '../components/OAPAuthenticationService'
class Exams extends Component{
    constructor(props)
    {
        super(props)
        this.state={
            Exams:[]
        }
        this.onClick = this.onClick.bind(this); 
    }
    onClick(e){
        var id=e.currentTarget.id
        window.open(window.location.origin + `/testing?ExamId=${id}`, '_blank', 'toolbar=0,location=0,menubar=0,resizable=no,top=500,left=500,width=4000,height=4000'); 
    } 
    componentDidMount(){
        trackPromise(
        OAPAuthenticationService.fetchAllExams()
         .then( (response) =>{
             this.setState({
                 Exams:response.data
             },function() {
                console.log(response)})
        } ))
         
    }
    render()
    {
        return(
            <div  style={{marginLeft:"280px",marginRight:"50px",paddingTop:"90px",height:"100%"}}>
                
                <div className="row" >




                {
                            
                            this.state.Exams.map(
                                exam =>
                                <div class=" card border border-info rounded-lg myexcard" style={{width: "160px",height:"200px",marginLeft:"30px"}}>
                                    <img src={examImg} class="card-img-top" alt="..." style={{height:"100px"}}></img>
                                    <div class="card-body text-center">
                                        <span style={{fontSize:"15px"}} class="card-title">{exam._id}</span>
                            <p class="card-text" style={{fontSize:"15px"}}>{exam.subject}</p>
                                        <button onClick={this.onClick}  id={exam._id} class="btn writeExam">Write Exam</button>
                                    </div>
                                </div>
                                
                            )
                }
                    
                    
                    

                    



                </div>
            </div>

            
        )
    }
}
export default Exams