import React, { Component } from 'react';
import {Formik,Form,Field, ErrorMessage} from 'formik'
import Button from '@material-ui/core/Button';
import { CircularProgress } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';

import { withSnackbar } from 'notistack';

class CreateExam extends Component
{
    constructor(props)
    {
        super(props)
        this.state={
            isLoading:false,
            noOfQuestions:0,
            currentQuestion:'',
            optionA:'',
            optionB:'',
            optionC:'',
            optionD:'',
            examid:'',
            time:'',
            marksForEach:'',
            questions:[
                    
            ]
            

        }
        this.handleChange=this.handleChange.bind(this)
        this.addAnotherQuestion=this.addAnotherQuestion.bind(this)
        this.clearFields=this.clearFields.bind(this);

    }
    addAnotherQuestion()
    {
        if(this.state.currentQuestion==='' || this.state.optionA==='' || this.state.optionB==='' || this.state.optionC==='' || this.state.optionD==='')
        {
            return null
        }
        
        var newquestion={"question":this.state.currentQuestion,
                        "optionA":this.state.optionA,
                        "optionB":this.state.optionB,
                        "optionC":this.state.optionC,
                        "optionD":this.state.optionD,}
        console.log(newquestion)
        var updatedQuestions=this.state.questions
        updatedQuestions[this.state.noOfQuestions]=newquestion
        this.setState({
            questions:updatedQuestions,
            noOfQuestions:this.state.noOfQuestions+1
        },function() {
            console.log('questions array -'+this.state.questions.length +JSON.stringify(this.state.questions))})
        this.key = this.props.enqueueSnackbar('Profile updated Successfully',{ variant: "success" })
        this.clearFields()
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
        //console.log(event.target.value);
        var inputname=event.target.name;
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    render()
    {
        return(
            <div class="box" >
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
                    <textarea class="textarea is-hovered" name="currentQuestion" placeholder="Please enter question here" value={this.state.currentQuestion} onChange={this.handleChange}></textarea>
                    
                    <p class="control has-icons-left">
                        <input class="input" type="text" value={this.state.optionA} name="optionA" placeholder="option A" onChange={this.handleChange}></input>
                        <span class="icon is-small is-left">
                            <svg class="bi bi-circle" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/>
                            </svg>
                        </span>
                    </p>

                    <p class="control has-icons-left">
                        <input class="input" type="text" value={this.state.optionB} name="optionB" placeholder="option B" onChange={this.handleChange}></input>
                        <span class="icon is-small is-left">
                            <svg class="bi bi-circle" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/>
                            </svg>
                        </span>
                    </p>
                    
                    <p class="control has-icons-left">
                        <input class="input" type="text" value={this.state.optionC} name="optionC" placeholder="option C" onChange={this.handleChange}></input>
                        <span class="icon is-small is-left">
                            <svg class="bi bi-circle" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/>
                            </svg>
                        </span>
                    </p>

                    <p class="control has-icons-left">
                        <input class="input" type="text" value={this.state.optionD} name="optionD" placeholder="option D" onChange={this.handleChange}></input>
                        <span class="icon is-small is-left">
                            <svg class="bi bi-circle" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/>
                            </svg>
                        </span>
                    </p>
                    



                    </article>
                    <button class="button is-info" onClick={this.addAnotherQuestion}>Add another question</button>
                </div>
                <button class="button is-success">Create Exam</button>

            </div>
                )
    }
}
export default withSnackbar(CreateExam)