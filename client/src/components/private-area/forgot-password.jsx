import React from 'react';
import Joi from "joi-browser";
import Form from '../common/form';
import { Redirect } from "react-router-dom";
import { getCurrentUser, forgotPassword } from "../../services/userService";
import { toast } from 'react-toastify';

class ForgotPassword extends Form {

    state = { 
        data: { email: ''},
        errors: {}
     }

     schema = { 
        email: Joi.string().required().email().label('email'),
     }

    doSubmit = async () => {  
        try {
            const { data } = this.state;
            await forgotPassword(data);
            await toast('הלינק לאיפוס הסיסמה נשלח לך למייל')
            return this.props.history.replace('/')
        }catch(ex){
           this.setState({ errors: { email: 'ארעה שגיאה בשליחת המייל' } })
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

                        <h1 className="h3 mb-3 font-weight-normal text-dark text-center px-0">
                            שליחת לינק לאיפוס סיסמה
                        </h1>

                        { this.renderInput('email', 'מייל',false, 'email') }
                        { this.renderButton('שלח', 'btn btn-lg btn-outline-dark btn-block') }

                    </form>
                </div>
            </div>
        );
    }
}
 
export default ForgotPassword;