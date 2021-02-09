import React from 'react';
import Joi from "joi-browser";
import Form from '../common/form';
import { Link } from 'react-router-dom';
import http from '../../services/httpService';
import { apiUrl } from '../../config.json';
import { Redirect } from "react-router-dom";
import { toast } from 'react-toastify';
import { getCurrentUser, login } from "../../services/userService";

class Signup extends Form {
    state = { 
        data: { 
            name:'', 
            lastName: '',
            email: '', 
            phone:'',
            password:'', 
            // confirmPassword:'', 
         },
        errors: {}
     }

    schema = { 
        name: Joi.string().required().min(2).max(255).label('name'),
        lastName: Joi.string().required().min(2).max(255).label('last name'),
        email: Joi.string().required().email().label('mail'),
        phone: Joi.string().required().min(9).max(14).label('phone'),
        password: Joi.string().required().min(8).max(1024).label('password'),
        // confirmPassword: Joi.ref('password'),
     }

     doSubmit = async ()=>{

        const data  ={...this.state.data};
        data.admin = false;
  
        try{
          await http.post(`${apiUrl}/users`, data); 
          toast(`${data.name} You signup successfuly`);
         
          await login(data.email,data.password);
          window.location = '/private-area/my-projects';
         
        } catch(ex){
          if( ex.response && ex.response.status === 400){
            this.setState({ errors: { email: 'Email is taken' }});
          }
        }
       }

       

    render() { 
        let user = getCurrentUser();
        if(user && user.admin) return <Redirect to="/private-area/users" />
        if(user && !user.admin  && user.isBloger ) return window.location = "/private-area/blogs-search-page" ;
         user && <Redirect to="/private-area/my-projects" />

        return ( 
            <div className="container-fluid sign-up">
                <div className="center ">
                    <form onSubmit={ this.handleSubmit } 
                          autoComplete='off' 
                          method='POST' 
                          className="border border-light rounded p-4 bg-light col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3">

                        <h1 className="h3 mb-3 font-weight-normal text-dark text-center">טופס הירשמות</h1>

                        { this.renderInput('name', 'שם פרטי' ) }
                        { this.renderInput('lastName', 'שם משפחה' ) }
                        { this.renderInput('email', 'מייל', 'email') }
                        { this.renderInput('phone','טלפון', 'phone') }
                        { this.renderInput('password', 'סיסמה', 'password', ) }
                        {/* { this.renderInput('confirmPassword', 'חזור על הסיסמה', 'password') } */}

                        <div className="center">
                            <Link className='a-herf mb-2 text-rtl' to="/private-area/sign-in"> משתמש רשום?
                                <span className='font-weight-bold text-primary'> התחבר</span>
                            </Link>
                        </div>

                        { this.renderButton('שלח', 'btn btn-lg btn-outline-dark btn-block') }

                    </form>
                </div>
            </div>
         );
    }
}
 
export default Signup;