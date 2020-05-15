import React,{ Component } from "react";
import '../App.css'

import OAPAuthenticationService from '../onlineExamPortal/components/OAPAuthenticationService.js'
import { Button, Modal, ModalFooter, ModalHeader,ModalBody} from 'reactstrap';
import $ from "jquery"
import queryString from 'query-string'
import ResultsComponent from '../onlineExamPortal/components/ResultsComponent'

import moment from 'moment'

import { CircularProgress } from "@material-ui/core";


class WriteExam extends Component
{
    constructor(props){
        super(props)
        this.state={
            actions: [],

            isLoading:false,

            myflag:0,

            currentExamId:'',
            studentId:'',

            malpracticeCount:0,

            minutes: -1,
            seconds: 0,
            modal: false,
            fade: true,

            isExamFinished:'',
            doLoadExam:'',

            submissionDate:'',
            correct:'',
            incorrect:'',
            total:'',
            score:'',



            jumbledQid:'',
            currentQuestion:0,
            currentQuestionId:'',
            prevQuesId:'',
            optiona:'',
            optionb:'',
            optionc:'',
            optiond:'',
            currentOption:'',
            questions:[
                
            ],
            answers:[],
            myanswers:[
                {"qid":"1","answer":"Narendra Modi"},{"qid":"2","answer":"Parasite"}
                ]
            
        }
        this.highlightCurrent=this.highlightCurrent.bind(this);
        this.toggle = this.toggle.bind(this);
        this.submitExam=this.submitExam.bind(this);
        this.getScores=this.getScores.bind(this);
        this.toggleLoading=this.toggleLoading.bind(this);
        this.autoSubmit=this.autoSubmit.bind(this);
        this.shuffleQuestions=this.shuffleQuestions.bind(this);
        
    }
    
    toggleLoading = () => {
        this.setState((prevState, props) => ({
          isLoading: !prevState.isLoading
        }))
      }
    shuffleQuestions(myquestions)
    {
        for (var i = myquestions.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = myquestions[i];
            myquestions[i] = myquestions[j];
            myquestions[j] = temp;
        }
        return myquestions;

    }
    componentDidMount(){
        var self=this
        var mywindow;
        
        //console.log(this.state.questions[0].question);
        var myExamId=queryString.parse(this.props.location.search)
        console.log('--------------------------------------------im exmaid------------'+myExamId.ExamId);
        let userid=OAPAuthenticationService.getLoggedInUsername();
        this.setState({
            currentExamId:myExamId.ExamId,
            studentId:userid
        })
        OAPAuthenticationService.fetchExam(myExamId.ExamId,userid)
        .then( (reponse) =>{
            console.log(reponse)

            if(reponse.data==='')
            {
                clearInterval(this.myInterval)
                this.setState({
                    isExamFinished:true,
                    doLoadExam:false
                })
                this.getScores();
            }
            else
            {
                this.setState({
                    isExamFinished:false,
                    doLoadExam:true,
                    questions:reponse.data.questions,
                    
                    minutes:reponse.data.minutes



                },function() {
                    console.log("im in highlight")
                    let shuffledQuestions=this.shuffleQuestions(this.state.questions)
                    this.setState({
                        questions:shuffledQuestions,
                        prevQuesId:1,
                        currentQuestionId:1,

                        jumbledQid:this.state.questions[0].qid,
                        currentQuestion:this.state.questions[0].question,
                        optiona:this.state.questions[0].options[0],
                        optionb:this.state.questions[0].options[1],
                        optionc:this.state.questions[0].options[2],
                        optiond:this.state.questions[0].options[3],

                        
                    },this.highlightCurrent())
                    }
                 ,
                 $(window).on("blur focus", function(e) {
                    var prevType = $(this).data("prevType");
                    var count=0
                    if (prevType != e.type) {   //  reduce double fire issues
                        switch (e.type) {
                            case "blur":
                                if(self.state.malpracticeCount>=1)
                                {
                                    alert("Mal practice! your exam is being auto submitted!")
                                    console.log("--------------------------"+count)
                                    self.fakeSubmit()
                                }
                                else{
                                    alert('This is first and last warning,next time exam will auto submit')
                                    self.setState({malpracticeCount:1})
                                }
                                break;
                            case "focus":
                                
                                break;
                        }
                    }
                
                    $(this).data("prevType", e.type);
                }),
                

                
                this.myInterval = setInterval(() => {
                    const { seconds, minutes } = this.state
                    if (seconds > 0) {
                      this.setState(({ seconds }) => ({
                        seconds: seconds - 1
                      }))
                    }
                    if (seconds === 0) {
                      if (minutes === 0) {
                        clearInterval(this.myInterval)
                      } else {
                        this.setState(({ minutes }) => ({
                          minutes: minutes - 1,
                          seconds: 59
                        }))
                      }
                    }
                  }, 1000)
                 )
            }
        })

        
          

       
        
    }
    fakeSubmit()
    {
        console.log("----------------fake submit")
    }
    
    componentWillUnmount() {
        clearInterval(this.myInterval)
        

        }
    highlightCurrent()
    {
        console.log("prev------------------"+this.state.prevQuesId+'qnum')
        console.log("currr------------------"+this.state.currentQuestionId+'qnum')

        if(this.state.prevQuesId==='' && this.state.currentQuestionId==='')
        {
            document.getElementById(this.state.questions[0].qid+'qnum').style.backgroundColor="#00ccff"
            document.getElementById(this.state.questions[0].qid+'qnum').style.backgroundColor="#66ff33"    
        }
        else
        {
            document.getElementById(this.state.prevQuesId+'qnum').style.backgroundColor="#00ccff"
            document.getElementById(this.state.currentQuestionId+'qnum').style.backgroundColor="#66ff33"

        }
        

        
    }
    
    handleQuestionClicked= (e) => {
        //if and else conditions are used to check whether option is already selected
        let qindex=e.currentTarget.id;
        console.log("qindex-----------------------------------"+qindex)
        if(!this.state.answers[qindex])
        {   
            console.log("im in if------------------")
            document.getElementById('a').style.background="#fff"
            document.getElementById('b').style.background="#fff"
            document.getElementById('c').style.background="#fff"
            document.getElementById('d').style.background="#fff"

        }
        else
        {
            console.log("im in else------------------")
            console.log(this.state.answers[qindex])
            var existingoption=this.state.answers[qindex].selectedOption
            document.getElementById(existingoption).style.background="#66ff66"
            if(existingoption!='a')
            document.getElementById('a').style.background="#fff"
            if(existingoption!='b')
                document.getElementById('b').style.background="#fff"
            if(existingoption!='c')
                document.getElementById('c').style.background="#fff"
            if(existingoption!='d')
                document.getElementById('d').style.background="#fff"

        }
        this.setState({
            
                currentQuestion:this.state.questions[qindex-1].question,
                jumbledQid:this.state.questions[qindex-1].qid,
                prevQuesId:this.state.currentQuestionId,
                currentQuestionId:qindex,
                optiona:this.state.questions[qindex-1].options[0],
                optionb:this.state.questions[qindex-1].options[1],
                optionc:this.state.questions[qindex-1].options[2],
                optiond:this.state.questions[qindex-1].options[3],
        },function() {
            console.log("im in highlight")
            console.log(this.state.currentQuestion)
            this.highlightCurrent()})
      }
    handleOptionClicked = (e) =>{
        let opindex=e.currentTarget.id;
        console.log('option '+opindex);
        this.setState({
            currentOption:opindex
        })
        let ans=e.currentTarget.textContent
        var newarr=this.state.answers
        console.log("new arr"+newarr)
        

        var newInp={"qid":this.state.jumbledQid,"submittedresponse": ans,"selectedOption":opindex}
        newarr[this.state.currentQuestionId]=newInp
        this.setState({
            answers:newarr
        },function() {
                 console.log('answers array -'+this.state.answers.length +JSON.stringify(this.state.answers))})

        
        
        document.getElementById(opindex).style.background="#66ff66"
        if(opindex!='a')
            document.getElementById('a').style.background="#fff"
        if(opindex!='b')
            document.getElementById('b').style.background="#fff"
        if(opindex!='c')
            document.getElementById('c').style.background="#fff"
        if(opindex!='d')
            document.getElementById('d').style.background="#fff"
    }
    
    toggle() {
        console.log("toggle clicked")
        this.setState({
            modal: !this.state.modal,
            fade: !this.state.fade
  
        });
    }

    autoSubmit()
    {
        clearInterval(this.myInterval)
        console.log("im in autosubmit---------------------------------------------")
        this.setState({
            minutes:-1,
            isExamFinished:true
        })
    
            
             OAPAuthenticationService.submitExam(this.state.currentExamId,this.state.studentId,moment(new Date()).format('DD-MM-YYYY HH:mm:ss '),this.state.answers)
             .then( (response) =>{
                 console.log(response);
                 this.getScores()
                 //window.location.reload()                
            },)
        
         
         
    }

    submitExam()
    {
        this.toggleLoading()
        console.log("im in submitExam-----------------------------------------------------");
        
        OAPAuthenticationService.submitExam(this.state.currentExamId,this.state.studentId,moment(new Date()).format('DD-MM-YYYY HH:mm:ss '),this.state.answers)
         .then( (response) =>{
            console.log(response);
            
            this.setState({
                isExamFinished:true,
                submissionDate:response.data.submittedDate,
                correct:response.data.correct,
                incorrect:response.data.incorrect,
                total:response.data.total,
                score:response.data.score,
            },window.location.reload())
         })
    }
    getScores()
    {
        let userid=OAPAuthenticationService.getLoggedInUsername();
        var myExamId=queryString.parse(this.props.location.search)
        OAPAuthenticationService.getScore(myExamId.ExamId,userid)
         .then(
             (response) =>{
                console.log(response)
                 if(response.data!='')
                 {
                        console.log(response);
                        this.setState({
                            isExamFinished:true,
                            submissionDate:response.data.submittedDate,
                            correct:response.data.correct,
                            incorrect:response.data.incorrect,
                            total:response.data.total,
                            score:response.data.score
                        })
                 }
             }
         )
    }
    
    render(){
        
        const { minutes, seconds } = this.state


        if(this.state.isExamFinished)
        {
            return(
                <div >
                    
                    <div class="alert alert-danger" role="alert">
                        Your Exam had finished!
                    </div>
                    
                    
                    <ResultsComponent AssessmentID={this.state.currentExamId} Subject="OOAD" date={this.state.submissionDate} correct={this.state.correct} incorrect={this.state.incorrect} score={this.state.score} total={this.state.total} />
                </div>
            )
        }
        if(this.state.doLoadExam)
        {
            return(
                
                <div className="container-fluid">


                    <Modal isOpen={this.state.modal} toggle={this.toggle}
                        fade={this.state.fade}
                        className={this.props.className}>
                        <ModalHeader toggle={this.toggle}> 
                        
                        <h3 style={{marginLeft:"50px"}}>Do you want Submit exam?</h3>


                        </ModalHeader>
                        <ModalBody>

                        
                        <div className="col-sm-10 col-12" style={{paddingLeft:"150px"}}>
                                <span id="quote">
                                    
                                : <span >Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span></span>
                            </div>


                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" disabled={this.state.isLoading} onClick={this.submitExam}>
                                
                                
                                
                                {this.state.isLoading && <CircularProgress size={20} color="#" /> }
                                {!this.state.isLoading && "Submit Exam"}
                            
                            
                            </Button>{' '}

                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                <div>
                    <div className="container ">
                        <div className="get-quote">
                        <div className="row examheader" >
                            <div className="col-sm-10 col-12" style={{paddingLeft:"200px"}}>
                                <h3 id="quote">
                                    { minutes === 0 && seconds === 0? this.autoSubmit()
                                : <h3 >Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h3>
                        }</h3>
                            </div>
                            <div className="col-sm-2 col-12 ">
                                <button type="button" onClick={this.toggle} className=" btn btn-info pull-right mybtn" style={{marginLeft:"175px",marginTop:"5px"}}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
                    
                </div>
                <div className="row examarea">
                    <div className="col-lg-3" id="left">
                        <div className="box" >
                            {
                                console.log(this.state.questions),
                                this.state.questions.map(
                                    (question,index) =>
                                        
                                        <div className=" card  qlist" id={index+1} key={question.qid} onClick={this.handleQuestionClicked} >
                                        <div className="col qnum" id={(index+1)+'qnum'}>{index+1}</div>
                                        <div className="col-11">{question.question.substring(0,50)}{question.question.length>50 && '...'}</div>
                                    
                                    </div>

                                    
                                    
                                    
                                    
                                )
                            }
                        </div>
                    </div>
                    <div className="col-lg-9 " id="right" >
                            
                        
                            <div id="fitin" className="questionArea">
                            <span >{this.state.currentQuestionId+"."+this.state.currentQuestion}</span>
                            </div>


                            <div className="row justify-content-center ">
                                <div className="card  optionarea col-4 " id="a" onClick={this.handleOptionClicked}>{this.state.optiona}</div>
                                <div className="card optionarea col-4" id="b" onClick={this.handleOptionClicked}>{this.state.optionb}</div>
                            </div><br></br>
                            <div className="row justify-content-center">
                                <div className="card optionarea col-4" id="c" onClick={this.handleOptionClicked}>{this.state.optionc}</div>
                                <div className="card optionarea col-4" id="d" onClick={this.handleOptionClicked}>{this.state.optiond}</div>

                            </div>

                            
                    

                    </div>
                </div>
                </div>
                
                
            )
        }
        return (
            <div class="loading">Loading&#8230;</div>
        )
    }

}
export default WriteExam;