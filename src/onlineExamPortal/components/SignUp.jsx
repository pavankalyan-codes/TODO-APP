import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Formik,Form,Field, ErrorMessage} from 'formik'
import OAPAuthenticationService from './OAPAuthenticationService.js'





class SignUp extends Component {


  constructor(props)
  {
      super(props)
      this.state= {
          studentname:'',
          studentid:'',
          studentmail:'',
          studentpassword:'',
          registerSuccess:false,
          registerFailed:false,
          errorMessage:''
      }
      this.onSubmit=this.onSubmit.bind(this)
  }
  nameHandleChange = (event) =>
  {
      this.setState(
          {
          studentname:event.target.value
          },
          ()=>{
          console.log(this.state.studentname)
            
            });
  }
 
  idHandleChange = (event) =>
  {
      this.setState(
          {
          studentid:event.target.value
          },
          ()=>{
          console.log(this.state.studentid)
            
            });
  }
  emailHandleChange = (event) =>
  {
      this.setState(
          {
          studentmail:event.target.value
          },
          ()=>{
          console.log(this.state.studentmail)
            
            });
  }
  passwordHandleChange = (event) =>
  {
      this.setState(
          {
          studentpassword:event.target.value
          },
          ()=>{
          console.log(this.state.studentpassword)
            
            });
  }
  onSubmit(values){
      console.log(this.state.studentid)
      if(this.state.studentname==="" || this.state.studentid==="" || this.state.studentmail==="" || this.state.studentpassword==="")
      {
          this.setState({
              registerSuccess:false,
              registerFailed:true,
              errorMessage:"Please fill all the Fields"
          })
          
      }
      else
      {
        OAPAuthenticationService.createAccount(this.state.studentname,this.state.studentid,this.state.studentmail,this.state.studentpassword)
        .then( (response) =>{
            console.log(response)
            if(response.data.message==="Success")
            {
                this.setState({
                    registerSuccess:true,
                    registerFailed:false,
                    studentname:'',
                    studentid:'',
                    studentmail:'',
                    studentpassword:''
                    
                })
            }
            else
            {
                this.setState({
                    errorMessage:response.data.message+'. Unable to create Account!',
                    registerFailed:true,
                    registerSuccess:false
                })
            }
      
        })
        .catch( (response) =>{
            this.setState({
                errorMessage:'Network Error. Unable to create Account!',
                registerFailed:true,
                registerSuccess:false
            })
        })
      }
}
  
  render(){
  let {studentname,studentmail,studentid,studentpassword}=this.state
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div >
        
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>


        <Formik
            initialValues={{studentname,studentid,studentmail,studentpassword}}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={this.onSubmit}
            validate={this.validate}
            enableReinitialize={true}

        
        >
        {
            (props) => (
                <Form Use>
                   {this.state.registerSuccess && <div class="alert alert-success" role="alert">Account Created Successfully!</div>}
                   {this.state.registerFailed && <div class="alert alert-danger" role="alert">{this.state.errorMessage}</div>}
                
                <TextField
                    variant="outlined"
                    margin="normal"
                    
                    fullWidth
                    id="name"
                    onChange={this.nameHandleChange}
                    label="Student Name"
                    name="name"
                    value={this.state.studentname}
                    autoComplete="name"
                    
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    
                    fullWidth
                    id="sid"
                    value={this.state.studentid}
                    onChange={this.idHandleChange}
                    label="Studen ID"
                    name="sid"
                    autoComplete="sid"
                    
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    
                    fullWidth
                    id="email"
                    value={this.state.studentmail}
                    onChange={this.emailHandleChange}
                    label="Email"
                    name="email"
                    autoComplete="email"
                
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={this.state.studentpassword}
                    onChange={this.passwordHandleChange}
                    autoComplete="current-password"
                />
                
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Sign Up
                </Button>
                <Grid container style={{marginTop:20}}>
                    <Grid item xs>
                    <Link to="\" variant="body2">
                        Forgot password?
                    </Link>
                    </Grid>
                    <Grid item>
                    <Link to="/signin" >
                        Already have account? Sign In
                    </Link>
                    </Grid>
                </Grid>
                </Form>
            )}
            </Formik>
      </div>
    </Container>
  );
  }
}
export default SignUp