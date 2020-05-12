import React, { Component } from 'react';
import {Formik,Form,Field, ErrorMessage} from 'formik'
import Button from '@material-ui/core/Button';
import { CircularProgress } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import OAPAuthenticationService from './OAPAuthenticationService.js'
import NavigationIcon from '@material-ui/icons/Navigation';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';

import { withSnackbar } from 'notistack';


const style = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};
class CreateExam extends Component
{
    constructor(props)
    {
        super(props)
        this.state={
            modal:false,

            isLoading:false,
            noOfQuestions:0,
            examid:'',
            subject:'',
            currentQuestion:'',
            optionA:'',
            optionB:'',
            optionC:'',
            optionD:'',
            examid:'',
            time:'',
            marksForEach:'',
            questions:[
                    
            ],
            currentQuestionAnswer:''
            

        }
        this.handleChange=this.handleChange.bind(this)
        this.addAnotherQuestion=this.addAnotherQuestion.bind(this)
        this.clearFields=this.clearFields.bind(this);
        this.createExam=this.createExam.bind(this);
        this.toggleLoading=this.toggleLoading.bind(this);
        this.toggle = this.toggle.bind(this);

    }
    toggleLoading = () => {
        this.setState((prevState, props) => ({
          isLoading: !prevState.isLoading
        }))
      }
      toggle() {
        console.log("toggle clicked")
        this.setState({
            modal: !this.state.modal,
  
        });
    }
    addAnotherQuestion()
    {
        if(this.state.currentQuestion==='' || this.state.optionA==='' || this.state.optionB==='' || this.state.optionC==='' || this.state.optionD==='')
        {
            return null
        }
        
        var newquestion={
                            "qid":this.state.noOfQuestions+1,
                            "question":this.state.currentQuestion,

                            options:[
                                this.state.optionA,
                                this.state.optionB,
                                this.state.optionC,
                                this.state.optionD
                            ],
                            "answer":this.state.currentQuestionAnswer
                        }
        console.log(newquestion)
        var updatedQuestions=this.state.questions
        updatedQuestions[this.state.noOfQuestions]=newquestion
        this.setState({
            questions:updatedQuestions,
            noOfQuestions:this.state.noOfQuestions+1
        },function() {
            console.log('questions array -'+this.state.questions.length +JSON.stringify(this.state.questions))})
        this.key = this.props.enqueueSnackbar('Qustion added Successfully',{ variant: "success" })
        this.clearFields()
      }
    



    createExam()
    {
        this.toggleLoading()
        this.toggle()
        OAPAuthenticationService.createExam(this.state.examid,this.state.subject,this.state.questions)
        .then(
            (response) =>{
                console.log(response)
                this.toggleLoading()
            }
            
        )
    }  
    clearFields()
    {
            this.setState({
                currentQuestion:'',
                optionA:'',
                optionB:'',
                optionC:'',
                optionD:''
            })
    }
    handleChange(event) {
        console.log(event.target.name+"-"+event.target.value);
        var inputname=event.target.name;
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    render()
    {
        
        return(
            <div  >
                <div class={this.state.modal? 'modal is-active':'modal'}>
                    <div class="modal-background"></div>
                    <div class="modal-content">
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.</span>
                    </div>
                    <button class="modal-close is-large" onClick={this.toggle} aria-label="close"></button>
                </div>
                <div class="box myexamheader control">
                    <div className="row">
                        <label class="label column" style={{float: "left"}}>ExamID</label>
                        <label class="label column"  style={{float: "right"}}>Subject</label><br/>
                    </div>
                    <div className="row">
                        <input class="input is-rounded column" style={{float: "left",width:"230px"}} value={this.state.examid} name="examid" onChange={this.handleChange} type="text" placeholder="ExamId"/>
                        
                        <input class="input is-rounded column" style={{float: "right",width:"230px"}} value={this.state.subject} name="subject" onChange={this.handleChange} type="text" placeholder="Subject"/>
                    </div>
                    {/* <div class="row" style={{marginTop:"5px"}}>
                    <label class="label column">Enter Count down time(in minutes)</label>
                    <input class="input is-small column" type="number" style={{width:"30px !important",marginTop:"10px"}} value={this.state.subject} name="subject" onChange={this.handleChange} placeholder="minutes"/>

                    </div> */}
                    
                </div>
                <div class="control myexam box ">
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.8.2/css/bulma.min.css" rel="stylesheet"/>
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.8.2/css/bulma.css" rel="stylesheet"/>
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.8.2/css/bulma.css.map" rel="stylesheet"/>
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
                    <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>

                    <article class="panel is-success">
                    <p class="panel-heading" style={{height:"40px"}}>
                        <h1 style={{float: "left"}}>Add Question</h1>
                        <h1 style={{float: "right"}}>{this.state.noOfQuestions} question(s) added</h1>
                    </p>
                    <textarea class="textarea is-hovered" cols="10" name="currentQuestion" placeholder="Please enter question here" value={this.state.currentQuestion} onChange={this.handleChange}></textarea>
                    
                    <p class="control has-icons-left">
                        <input class="input" type="text" value={this.state.optionA} name="optionA" placeholder="option A" onChange={this.handleChange}></input>
                        <span class="icon is-small is-left">
                            A
                        </span>
                    </p>

                    <p class="control has-icons-left">
                        <input class="input" type="text" value={this.state.optionB} name="optionB" placeholder="option B" onChange={this.handleChange}></input>
                        <span class="icon is-small is-left">
                            B
                        </span>
                    </p>
                    
                    <p class="control has-icons-left">
                        <input class="input" type="text" value={this.state.optionC} name="optionC" placeholder="option C" onChange={this.handleChange}></input>
                        <span class="icon is-small is-left">
                            C
                        </span>
                    </p>

                    <p class="control has-icons-left">
                        <input class="input" type="text" value={this.state.optionD} name="optionD" placeholder="option D" onChange={this.handleChange}></input>
                        <span class="icon is-small is-left">
                            D
                        </span>
                    </p>
                    <div class="control" style={{marginTop:"50px"}}>
                        <div class="select is-success" style={{float: "left"}}>
                        <select value={this.state.currentQuestionAnswer} onChange={this.handleChange} name="currentQuestionAnswer">
                            <option selected value="">Select answer</option>
                            <option name="currentQuestionAnswer" value={this.state.optionA}>A</option>
                            <option name="currentQuestionAnswer" value={this.state.optionB}>B</option>
                            <option name="currentQuestionAnswer" value={this.state.optionC}>C</option>
                            <option name="currentQuestionAnswer" value={this.state.optionD}>D</option>
                        </select>
                        </div>
                        <button class="button is-info" style={{float: "right"}} onClick={this.addAnotherQuestion}>Add another question</button>
                    </div>

                    </article>
                    <br></br>
                    
                    

                </div>
                <Button className={ 'button is-success' + (this.state.isLoading ? ' is-loading' : '') } onClick={this.createExam}>Create Exam</Button>

            </div>
                )
    }
}
export default withSnackbar(CreateExam)