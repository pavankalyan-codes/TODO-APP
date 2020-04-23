import React, { Component } from 'react'
import './Counter.css'
import PropTypes from 'prop-types'


class Counter extends Component{
    constructor(){
        super(); //Error 1
        this.state={
            counter: 0
        }

        this.increment=this.increment.bind(this);
        this.decrement=this.decrement.bind(this);
        this.reset=this.reset.bind(this);
    }
    render() {
        return (
          <div className="counter">
                <CounterButton by={1} incrementMethod={this.increment} decrementMethod={this.decrement}/>
                <CounterButton by={5} incrementMethod={this.increment} decrementMethod={this.decrement}/>
                <CounterButton by={10} incrementMethod={this.increment} decrementMethod={this.decrement}/>
                <span className="count">{this.state.counter}</span>
                <div ><button className="reset" onClick={this.reset}>Reset</button></div>
                
          </div>
        );
      }
      increment(by) 
      {
        //console.log(`increment from child  - ${by}`)
        this.setState(
           (prevState) =>  {
            return {counter : prevState.counter+by}
            }
        )
            // this.setState({
            //     counter: this.state.counter //+ this.props.by
            //             });
       }
       decrement(by) 
       {
        //console.log(`increment from child  - ${by}`)
        this.setState(
           (prevState) =>  {
            return {counter : prevState.counter-by}
            }
        )
            // this.setState({
            //     counter: this.state.counter //+ this.props.by
            //             });
       }
       reset()
       {
           this.setState(
               () => {
                    return {counter : 0}
               }
           )
       }
}

class CounterButton extends Component{


    //Define the initial state in a constructor
    //state => counter 0
    // constructor(){
    //     super(); //Error 1
    //     // this.state={
    //     //     counter: 0
    //     // }

    //     // this.increment=this.increment.bind(this);
    //     // this.decrement=this.decrement.bind(this);
    // }
    render() {
    //render = () => {
    return (
        <div className="Counter">
            <button onClick={() =>this.props.incrementMethod(this.props.by)} >+{this.props.by}</button>
            <button onClick={() =>this.props.decrementMethod(this.props.by)} >-{this.props.by}</button>
            
        </div>
    )
    }
    // increment() {
    // //increment = () =>{
    //     //this.state.counter=this.state.coutner+1;
    //     //console.log('increment');
    //     this.setState({
    //         counter: this.state.counter + this.props.by
    //                 });
    //     this.props.incrementMethod(this.props.by);
    // }
    // decrement(){
    //     this.props.decrementMethod(this.props.by);
    // }
        
    
    
}
Counter.defaultProps={
    by : 1
}
Counter.propTypes ={
    by : PropTypes.number
}
export default Counter
