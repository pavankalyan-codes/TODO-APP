import React,{ Component } from "react";
import avatar from '/home/kalyantvk/Documents/backup/TODO-APP/src/avatar.png'
import OAPAuthenticationService from '../components/OAPAuthenticationService'
import {Formik,Form,Field, ErrorMessage} from 'formik'



import { withSnackbar } from 'notistack';
import { trackPromise } from 'react-promise-tracker';
import { Spinner } from "../../common/components/spinner";





const Button = (props) => (
    <button 
      className={ props.className }
      onClick={ props.action }
      >
      { props.title }
    </button>
  )
  

class Profile extends Component{
    
    constructor(props)
    {
        super(props)
        this.state={
            _id:'R141640',
            name:'',
            email:'',
            password:'',
            open: true,
            isLoading: false
        }
        this.updateProfile=this.updateProfile.bind(this);
        this.toggleLoading=this.toggleLoading.bind(this)
        
    }

    
    updateProfile(values)
    {
        this.toggleLoading()
        if(!values.name || !values.email || !values.password)
        {
            this.toggleLoading()
            return null
        }
        trackPromise(
        OAPAuthenticationService.updateProfile(this.state._id,values.name,values.email,values.password)
         .then(
             (response) =>{
                
                 var isUpdated=response.data.reponse
                 if(isUpdated)
                 {
                    console.log(response)
                    this.setState({
                        name:values.name,
                        email:values.email,
                        
                    })
                    this.key = this.props.enqueueSnackbar('Profile updated Successfully',{ variant: "success" })
                 }
                 else{
                    console.log(response)
                    this.key = this.props.enqueueSnackbar('Unable to update profile. '+response.data.message,{ variant: "error" })
                 }
                 this.toggleLoading()
                 
             }
             
         )
         .catch(
             
             (response) =>{
                 if(!response.data.reponse)
                 {
                    
                    console.log(response)
                    this.toggleLoading()
                    this.key = this.props.enqueueSnackbar('Unable to update profile. Network error'+response.ErrorMessage,{ variant: "error" })
                 }
                 else
                 {
                    this.toggleLoading()

                 }
                
            }
             
            
         )

         )
    }
    validate(values){
        let errors={}
        if(!values.name){
            errors.description='Enter valid name'

        }
        else if(!values.email)
        {
            errors.description='Enter a valid email'
        }
        else if(!values.password)
        {
            errors.description='Enter a password'
        }

        console.log(values);
        return errors
    }
    componentDidMount(){
        OAPAuthenticationService.getProfile("R141640")
         .then(
             (response) =>{
                 console.log(response.data)
                 this.setState({
                     name:response.data.students.name,
                     email:response.data.students.email 

                 })
                 
             }
         )
    }
    toggleLoading = () => {
        this.setState((prevState, props) => ({
          isLoading: !prevState.isLoading
        }))
      }
    render(){
    const { open } = this.state
    let {name,email,password}=this.state
        return(

            <div style={{marginLeft:"250px"}}>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.1/css/bulma.min.css" rel="stylesheet"/>

                <h1 class="title">Edit Profile</h1>
                <hr></hr>
                <div className="card d-flex align-items-center profilecard">
                
                            <Formik
                            initialValues={{name,email,password}}
                            validateOnBlur={true}
                            validateOnChange={true}
                            onSubmit={this.updateProfile}
                            validate={this.validate}
                            enableReinitialize={true}>
                            {
                            (props) => (
                                <Form>


                         <img src={avatar} alt="Avatar" class="avatar" className="avatar"></img> <br></br>
                            <ErrorMessage name="description" component="div"
                                    className="alert alert-warning"/>   
                                 <fieldset className="form-group">
                                    <label className="label" >Name</label>
                                    <Field className="form-control input is-info" required type="text" name="name"/>
                                </fieldset>

                                <fieldset className="form-group">
                                    <label className="label" >Email</label>
                                    <Field className="form-control" required type="email" name="email"/>
                                </fieldset>

                                <fieldset className="form-group">
                                    <label className="label" >Password</label>
                                    <Field className="form-control" required type="password" name="password"/>
                                </fieldset>

                            
                            
                            <Button className={ 'button is-primary' + (this.state.isLoading ? ' is-loading' : '') } action={ this.updateProfile } title='Update Profile' />

                            </Form>
                            )}
                            </Formik>
                            
                            
                            
                </div>
            </div>
        )
    }
}
export default withSnackbar(Profile)