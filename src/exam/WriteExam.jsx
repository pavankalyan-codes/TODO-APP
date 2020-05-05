import React,{ Component } from "react";
import '../App.css'
import OAPAuthenticationService from '../onlineExamPortal/components/OAPAuthenticationService.js'
class WriteExam extends Component
{
    constructor(props){
        super(props)
        this.state={
            currentQuestion:'',
            currentQuestionId:'',
            optiona:'',
            optionb:'',
            optionc:'',
            optiond:'',
            questions:[
                
            ],
            answers:{}
            
        }
        
    }
    componentDidMount(){
        
        //console.log(this.state.questions[0].question);
        OAPAuthenticationService.fetchExam("Assessment001")
        .then( (reponse) =>{
            console.log(reponse)
            this.setState({
                questions:reponse.data.questions,
                currentQuestion:reponse.data.questions[0].question,
                currentQuestionId:reponse.data.questions[0].qid,
                optiona:reponse.data.questions[0].options[0],
                optionb:reponse.data.questions[0].options[1],
                optionc:reponse.data.questions[0].options[2],
                optiond:reponse.data.questions[0].options[3],



            })
        })
       
        
    }
    
    handleQuestionClicked= (e) => {
        let qindex=e.currentTarget.id;
        
        this.setState({
            
            currentQuestion:this.state.questions[qindex-1].question,
                currentQuestionId:this.state.questions[qindex-1].qid,
                optiona:this.state.questions[qindex-1].options[0],
                optionb:this.state.questions[qindex-1].options[1],
                optionc:this.state.questions[qindex-1].options[2],
                optiond:this.state.questions[qindex-1].options[3],
        })
      }
    handleOptionClicked = (e) =>{
        let opindex=e.currentTarget.id;
        let ans=e.currentTarget.textContent
        var newInput = Object.assign({}, 
            this.state.answers, {[this.state.currentQuestionId]: ans});
        this.setState({
            answers:newInput
        },function() {
            console.log(this.state.answers)}
        )
        
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
    
    render(){
        return(
 
            <div className="container-fluid">
            <div className="row examarea">
                <div className="col-lg-3" id="left">
                    <div className="box" >
                        {
                            this.state.questions.map(
                                question =>
                                <div className="row card qlist" id={question.qid} key={question.qid} onClick={this.handleQuestionClicked} >
                                    <div className="col-4">{question.qid}</div>
                                    <div className="col-8">{question.question}</div>
                                   
                                </div>
                                
                            )
                        }
                    </div>
                </div>
                <div className="col-lg-9 questionArea" id="right" >
                    <h3 >{this.state.currentQuestionId+"."+this.state.currentQuestion}</h3>
                    


                        <div className="row justify-content-center">
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