import React,{ Component } from "react";
import Paper from '@material-ui/core/Paper';
import cardview from '../components/cardview.js'
import '../../App.css' 
import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'jquery/src/jquery'; //for bootstrap.min.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Home from './Home'
import Exams from './Exams'
import Results from './Results'
import Profile from './Profile'
import Logout from './Logout'
import {withRouter} from 'react-router'
import { useLocation } from 'react-router-dom'



import { BrowserRouter as Router, Route } from 'react-router-dom'



import examImg from '/home/kalyantvk/Documents/backup/TODO-APP/src/exam/exam.jpg'
import { useHistory } from "react-router-dom";

class Dashboard extends Component
{
    constructor(props){
        super(props); 
        this.state={
          currMenuItem:'',
          prevMenuItem:''
        }
      
      this.handleMenuClick=this.handleMenuClick.bind(this);
      this.logout=this.logout.bind(this);
      }
      
      showSettings (event) {
        event.preventDefault();
    
      }
      logout()
      {
        console.log("make lgout here")
        this.props.history.push("/signin")
      }
      handleMenuClick = (e) =>
      {
        
        var component=e.currentTarget.id
        if(component===this.state.currMenuItem)
          return null;
        this.setState({
          prevMenuItem:this.state.currMenuItem,
          currMenuItem:component
        })
        document.getElementById(component).style.color="#16c7ff"

        if(component==="logout")
        {
          this.logout()
        }
        else
        {
          console.log(component);
          this.props.history.push({pathname:`/${component}`,state:{detail:component}})
          if(component!='home')
              document.getElementById('home').style.color="#bdbdbd"
          if(component!='exams')
              document.getElementById('exams').style.color="#bdbdbd"
          if(component!='results')
              document.getElementById('results').style.color="#bdbdbd"
          if(component!='profile')
              document.getElementById('profile').style.color="#bdbdbd"
          if(component!='logout')
              document.getElementById('logout').style.color="#bdbdbd"
        }
        
      }
      componentDidMount(){
        var currId=this.props.location.state
        
        console.log('-----------------------------------'+currId)
        if(currId===undefined)
        {
          var myitem=this.props.location.pathname.substr(1);
          if(myitem!='')
          {
            document.getElementById(myitem).style.color="#16c7ff"
          }
          else
          {
            if(myitem=="logout")
            {
                this.logout();
            }
            else{
              document.getElementById("home").style.color="#16c7ff"
            }
          }
        }
        else
        {
          this.setState({
            currMenuItem:currId.detail
          })
          document.getElementById(currId.detail).style.color="#16c7ff"
        }
        
      }
      render () {
        
        // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
        return (
          
          <div class="page-wrapper chiller-theme toggled">


      <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
      <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
              crossorigin="anonymous"></script>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
        crossorigin="anonymous"></link>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"></link>
      <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet"></link>


      
            <a id="show-sidebar" class="btn btn-sm btn-dark" href="#">
              <i class="fas fa-bars"></i>
            </a>
            <nav id="sidebar" class="sidebar-wrapper">
              
              <div class="sidebar-content">

                <div class="sidebar-header">
                  <div>
                    <span style={{color:"White",fontSize: "18px"}}>Online Assessment Portal</span>
                  </div>
                </div>
              </div>
              
              <div class="sidebar-menu" style={{marginTop:"-500px",marginLeft:"-130px"}}>
                <ul>
                  <li class="sidebar-dropdown">
                    <a onClick={this.handleMenuClick} id="home">
                      <i class="fa fa-home"></i>
                      <span>Home</span>
                    </a>
                  </li>
                  <li class="sidebar-dropdown">
                    <a onClick={this.handleMenuClick} id="exams">
                    <i class="fa fa-book"></i>
                      <span>Exams</span>
                    
                    </a>
                  </li>
                  <li class="sidebar-dropdown">
                    <a onClick={this.handleMenuClick} id="results">
                      <i class="fa fa-graduation-cap"></i>
                      <span>Results</span>
                    </a>
                  </li>
                  <li class="sidebar-dropdown">
                    <a onClick={this.handleMenuClick} id="profile">
                      <i class="material-icons" style={{fontSize: "15px"}}>person</i>
                      <span>Profile</span>
                    </a>
                  </li>
                  <li class="sidebar-dropdown">
                    <a onClick={this.handleMenuClick} id="logout">
                    <i class='fas fa-sign-out-alt'></i>
                      <span>Logout</span>
                    </a>
                  </li>
                </ul>
              </div>
             
              
            </nav>

            <div className="dashbackground">
              <Router>
                  
                  
                  <Route path="/home" component={Home} />
                  
                  <Route path="/exams" component={Exams} />
                  <Route exact path="/results" component={Results} />
                  <Route path="/profile" component={Profile} />
              </Router>
              
            </div>

          </div>

        );
      }
}
export default Dashboard