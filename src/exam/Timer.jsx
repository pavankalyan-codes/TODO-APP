import React, { Component } from 'react'
import '../App.css'
import { Button, Modal, ModalFooter, ModalHeader,ModalBody} from 'reactstrap';

export default class Timer extends Component {
  constructor(props)
  {
      super(props)
      this.state={
        minutes: 3,
        seconds: 0,
        modal: props.initialModalState,
        fade: true
      }
      this.toggle = this.toggle.bind(this);
  }
  componentDidMount() {
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
  submitExam()
    {
      console.log("submit exam")
    }
  componentWillUnmount() {
    clearInterval(this.myInterval)
    }
  toggle() {
    console.log("toggle clicked")
      this.setState({
          modal: !this.state.modal,
          fade: !this.state.fade

      });
  }

  render() {
    const { minutes, seconds } = this.state

    
    return (
        // <div className="div-main">
        //   <div className="div-timer">
        // { minutes === 0 && seconds === 0
        //             ? <h3  class="timerdiv">Busted!</h3>
        //             : <h3  class="timerdiv">Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h3>
        //         }
        //         </div>
        //         <div className="div-submit">
        //           <button>Submit</button>
        //         </div>
        // </div>
        <>
        <div className="container ">
          <div className="get-quote">
              <div className="row examheader">
                  <div className="col-sm-10 col-12" style={{paddingLeft:"200px"}}>
                      <h3 id="quote">
                        { minutes === 0 && seconds === 0? <h3  >Busted!</h3>
                      : <h3 >Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h3>
               }</h3>
                  </div>
                  <div className="col-sm-2 col-12 ">
                      <button type="button" onClick={this.toggle} className=" btn btn-info pull-right mybtn" onClick={this.submitExam} style={{marginLeft:"175px",marginTop:"5px"}}>Submit</button>
                  </div>
              </div>
          </div>
        </div>

      <Modal isOpen={this.state.modal} toggle={this.toggle}
                       fade={this.state.fade}
                       className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>



                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
      </>
         
      
    )
  }
}