import { Field, Formik } from 'formik';
import React, { Component } from 'react';

class Login extends Component{
    render() {
        return (
            <div class="container py-5 bg-apply">
                <Formik>
                <div class="row">
                     <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-6 mx-auto">
                                <div class="card rounded-0">
                                    <div class="card-header">
                                        <h3 class="mb-0">Login</h3>
                                    </div>
                                    <div class="card-body">
                                        <form class="form" role="form" autocomplete="off" id="formLogin" novalidate="" method="POST">
                                            
                                            <div class="form-group"> 
                                                <fieldset className="form-group">
                                                    <label>Enter Student ID</label>
                                                    <Field className="form-control" type="text" name="description"/>
                                                </fieldset>
                                                <div class="invalid-feedback">Oops, you missed this one.</div>
                                            </div>
                                            
                                            <div class="form-group"> 
                                                <fieldset className="form-group">
                                                    <label>Enter Password</label>
                                                    <Field className="form-control" type="text" name="description"/>
                                                </fieldset>
                                                <div class="invalid-feedback">Oops, you missed this one.</div>
                                            </div>
                                            <button type="submit" class="btn btn-success btn-lg float-center" id="btnLogin">Login</button>
                                        </form>
                                    </div>



                                </div>
                            </div>

                         </div>
                    </div>
                </div>
                </Formik>
            </div>
        )
    }
    handleSubmit()
    {
        console.log("submit clicked")
    }
}

export default Login;