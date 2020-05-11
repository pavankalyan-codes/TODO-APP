import React,{ Component } from "react";
import '../App.css'

import OAPAuthenticationService from '../onlineExamPortal/components/OAPAuthenticationService.js'
import { Button, Modal, ModalFooter, ModalHeader,ModalBody} from 'reactstrap';
import $ from "jquery"
import queryString from 'query-string'



class WriteExam extends Component
{
    constructor(props){
        super(props)
        this.state={
            actions: [],

            currentExamId:'',

            malpracticeCount:0,

            minutes: 3,
            seconds: 0,
            modal: false,
            fade: true,

            currentQuestion:'',
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
        
    }
    
    
    componentDidMount(){
        var self=this
        var mywindow;
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
        })
        //console.log(this.state.questions[0].question);
        var myExamId=queryString.parse(this.props.location.search)
        console.log('--------------------------------------------im exmaid------------'+myExamId.ExamId);
        OAPAuthenticationService.fetchExam(myExamId.ExamId)
        .then( (reponse) =>{
            console.log(reponse)
            this.setState({
                questions:reponse.data.questions,
                currentQuestion:reponse.data.questions[0].question,
                currentQuestionId:reponse.data.questions[0].qid,
                prevQuesId:reponse.data.questions[0].qid,
                optiona:reponse.data.questions[0].options[0],
                optionb:reponse.data.questions[0].options[1],
                optionc:reponse.data.questions[0].options[2],
                optiond:reponse.data.questions[0].options[3],



            },function() {
                console.log("im in highlight")
                this.highlightCurrent()})
        })

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
        document.getElementById(this.state.prevQuesId+'qnum').style.backgroundColor="#00ccff"
        document.getElementById(this.state.currentQuestionId+'qnum').style.backgroundColor="#66ff33"
    }
    
    handleQuestionClicked= (e) => {
        let qindex=e.currentTarget.id;
        if(!this.state.answers[qindex])
        {   
            document.getElementById('a').style.background="#fff"
            document.getElementById('b').style.background="#fff"
            document.getElementById('c').style.background="#fff"
            document.getElementById('d').style.background="#fff"

        }
        else
        {
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
                prevQuesId:this.state.currentQuestionId,
                currentQuestionId:this.state.questions[qindex-1].qid,
                optiona:this.state.questions[qindex-1].options[0],
                optionb:this.state.questions[qindex-1].options[1],
                optionc:this.state.questions[qindex-1].options[2],
                optiond:this.state.questions[qindex-1].options[3],
        },function() {
            console.log("im in highlight")
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
        

        var newInp={"qid":this.state.currentQuestionId,"answer": ans,"selectedOption":opindex}
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
    submitExam()
    {
        console.log("exam submitted");
        
        OAPAuthenticationService.submitExam("Assessment001",this.state.answers)
         .then( (response) =>{
             console.log(response);
         })
    }
    
    render(){
        
        const { minutes, seconds } = this.state

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
                                { minutes === 0 && seconds === 0? this.submitExam()
                            : <span >Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>}</span>
                        </div>


                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.submitExam}>Submit Exam</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            <div>
                <div className="container ">
                    <div className="get-quote">
                    <div className="row examheader" >
                        <div className="col-sm-10 col-12" style={{paddingLeft:"200px"}}>
                            <h3 id="quote">
                                { minutes === 0 && seconds === 0? this.submitExam()
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
                            this.state.questions.map(
                                question =>
                                <div className=" card  qlist" id={question.qid} key={question.qid} onClick={this.handleQuestionClicked} >
                                    <div className="col qnum" id={question.qid+'qnum'}>{question.qid}</div>
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

}
export default WriteExam;