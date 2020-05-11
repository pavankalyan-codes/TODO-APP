import React, { Component } from "react";

class ExamReport extends Component{
    constructor(props)
    {
        super(props)
        this.state={
            score:'',
            correct:'',
            incorrect:''
            
        }
    }
    render(){
        return(
            <div>This is your exam report</div>
        )
    }
}
export default ExamReport