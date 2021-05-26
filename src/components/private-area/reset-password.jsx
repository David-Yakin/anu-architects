import React from 'react';
import Joi from "joi-browser";
import Form from '../common/form';
import { Redirect } from "react-router-dom";
import StrenthMeter from '../common/strength-meter/strength-meter';
import { Link } from 'react-router-dom';
import { resetPassword, getCurrentUser } from '../../services/userService';

class ResetPassword extends Form {
    state = { 
        data: { password:''},
        errors: {}
     }

     schema = { 
        password: Joi.string().required().min(8).label('password'),
     }

     checkMatch = ()=>{
        const passwordInput = document.getElementById('password-input') 
        const passwordCheck = document.getElementById('password') 
        if(passwordInput.value !== passwordCheck.value) return false
        return true
     }

    doSubmit = async () => {  
        console.log(1);
        try {
            const match = this.checkMatch()
            if(!match) return this.setState({ errors: { password: 'הסיסמה לא תואמת' }})

            const { data } = this.state;
            const userId = this.props.match.params.id;
            const token = this.props.match.params.token;
            await resetPassword(userId, token, data)

            let user = getCurrentUser();
            if(user && user.admin) return window.location = "/private-area/users" ;
            if(user && !user.admin && user.isBloger) return window.location = "/private-area/blogs-search-page" ;
            return window.location = '/private-area/my-projects';
        }catch(ex){
         if(ex.response && ex.response.status === 400){
           this.setState({ errors: { email: ex.response.data } })
         };
        }
    };

    render() { 
        let user = getCurrentUser();
        if(user && user.admin === true) return <Redirect to="/private-area/users" />
        if( user) return <Redirect to="/private-area/my-projects" />

        return ( 
            <div className="container-fluid sign-in">
                <div className="center ">

                <form onSubmit={ this.handleSubmit } 
                          autoComplete='off' 
                          method='POST' 
                          className="border border-light rounded p-4 bg-light">

                        <h1 className="h3 mb-3 font-weight-normal text-dark text-center px-0">איפוס סיסמה</h1>
                        <StrenthMeter />
                        { this.renderInput('password', 'חזור על הסיסמה *', false, 'password')}
                        
                        <div className="center">
                            <Link className='a-herf mb-2 text-rtl' 
                                  to="/private-area/sign-in"> לחזרה להתחברות
                                <span className='font-weight-bold text-primary'> לחץ כאן</span>
                            </Link>
                        </div>
                        { this.renderButton('שלח', 'btn btn-lg btn-outline-dark btn-block') }

                    </form>
                </div>
            </div>
        );
    }
}
 
export default ResetPassword;