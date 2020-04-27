import React,{ Component } from "react";
import '../App.css'

class WriteExam extends Component
{
    constructor(props){
        super(props)
        this.state={
            currentQuestion:'',
            currentQuestionId:-1,
            options:[],
            questions:[
                {
                    id:1,
                    question:"Who directed Most rated Netflix series",
                    options:{
                        a:"Bryan Cranston",
                        b:"Vince Gilligan",
                        c:"David Fincher",
                        d:"David Lynch"
                    }
                },
                {
                    id:2,
                    question:"Who directed Most rated Netflix series",
                    options:{
                        a:"Bryan Cranston",
                        b:"Vince Gilligan",
                        c:"David Fincher",
                        d:"David Lynch"
                    }
                },
                {
                    id:3,
                    question:"Who directed Most rated Netflix series",
                    options:{
                        a:"Bryan Cranston",
                        b:"Vince Gilligan",
                        c:"David Fincher",
                        d:"David Lynch"
                    }
                },
                {
                    id:4,
                    question:"Who directed Most rated Netflix series",
                    options:{
                        a:"Bryan Cranston",
                        b:"Vince Gilligan",
                        c:"David Fincher",
                        d:"David Lynch"
                    }
                },
                {
                    id:5,
                    question:"Who directed Most rated Netflix series",
                    options:{
                        a:"Bryan Cranston",
                        b:"Vince Gilligan",
                        c:"David Fincher",
                        d:"David Lynch"
                    }
                },
                {
                    id:6,
                    question:"Who directed Most rated Netflix series",
                    options:{
                        a:"Bryan Cranston",
                        b:"Vince Gilligan",
                        c:"David Fincher",
                        d:"David Lynch"
                    }
                },
                {
                    id:7,
                    question:"Who directed Most rated Netflix series",
                    options:{
                        a:"Bryan Cranston",
                        b:"Vince Gilligan",
                        c:"David Fincher",
                        d:"David Lynch"
                    }
                }
                ,
                {
                    id:8,
                    question:"Who directed Most rated Netflix series",
                    options:{
                        a:"Bryan Cranston",
                        b:"Vince Gilligan",
                        c:"David Fincher",
                        d:"David Lynch"
                    }
                }
                ,
                {
                    id:9,
                    question:"Who directed Most rated Netflix series",
                    options:{
                        a:"Bryan Cranston",
                        b:"Vince Gilligan",
                        c:"David Fincher",
                        d:"David Lynch"
                    }
                }
                ,
                {
                    id:10,
                    question:"Who directed Most rated Netflix series",
                    options:{
                        a:"Bryan Cranston",
                        b:"Vince Gilligan",
                        c:"David Fincher",
                        d:"David Lynch"
                    }
                }

            ]
            
        }
        
    }
    componentDidMount(){
        
        console.log(this.state.questions[0].question);
        
       
        
    }
    
    handleQuestionClicked(){
        console.log("clicked!");
    }
    
    render(){
        return(
 
            <div className="container-fluid">
            <div className="row">
                <div className="col-lg-3 " style={{backgroundColor : '#e6fffa'}}>
                    <h3>Questions </h3>
                </div>
                <div className="col-lg-9 " style={{backgroundColor : '#b3fff0'}}>
                    <h3 id="timer"> Timer </h3>
                </div>
                <div className="col-lg-3" id="left">
                    <div className="card" style={{backgroundColor : 'Pink'}}>
                        {
                            this.state.questions.map(
                                question =>
                                <div className="row card" key={question.id} onClick={this.handleQuestionClicked} >
                                    <div className="col-4">{question.id}</div>
                                    <div className="col-8">{question.question}</div>
                                   
                                </div>
                                
                            )
                        }
                    </div>
                </div>
                <div className="col-lg-9 " id="right" >
                    <h3 className="">{this.state.questions[0].id+"."+this.state.questions[0].question}</h3>
                    <ul>

                        <li className="card"><button className="btn btn-info">{this.state.questions[0].options.a}</button></li>
                        <li className="card"><button className="btn btn-info">{this.state.questions[0].options.b}</button></li>
                        <li className="card"><button className="btn btn-info">{this.state.questions[0].options.c}</button></li>
                        <li className="card"><button className="btn btn-info">{this.state.questions[0].options.d}</button></li>
                    </ul>

                </div>
            </div>
            </div>
            
            
        )
    }

}
export default WriteExam;