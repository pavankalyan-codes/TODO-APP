import React, { Component } from "react";
class Hello extends Component 
{ 
	constructor(props){
  	super(props); 
    this.onClick = this.onClick.bind(this); 
    }
    onClick(){ window.open(window.location.origin + "/testing", '_blank', 'toolbar=0,location=0,menubar=0'); } 
    render() { return (<div> Hi <button onClick = {this.onClick}>Open new Window and new route</button> </div>); } 
} 
export default Hello