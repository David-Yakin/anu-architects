import React from 'react';
import Titles from '../common/titles';
import Joi from "joi-browser";
import Form from '../common/form';
import { toast } from 'react-toastify';
import { sendMail } from '../../services/userService';

class ContectUs extends Form {

    state = { 
        data: { 
            name: '', 
            lastName:'', 
            email:'', 
            subject:'', 
            phone:'',
            message: ''
        },
        errors: {}
     }


     schema = { 
        name: Joi.string().required().min(2).max(255).label('name'),
        lastName: Joi.string().required().min(2).max(255).label('lastName'),
        email: Joi.string().required().email().label('email'),
        subject: Joi.string().required().min(2).max(255).label('subject'),
        phone: Joi.string().min(2).max(255).label('phone'),
        message: Joi.string().required().min(2).max(1024).label('message')
     }

     doSubmit = async () => { 
        const { data } = this.state;
        await sendMail(data)
        toast('ההודעה נשלחה! אנו ניצור עמך קשר בהקדם');
        this.setState({data:{ name: '', lastName:'', email:'',  subject:'',  phone:'', message: '' } })
     };
    
    render() { 
        return ( 
            <div id="contact" className="contact container-fluid px-0 mx-0">
                <div className="container">
                       
                    <Titles titleBold='צור'
                        title= 'קשר'
                        subTitle='כל מה שנשאר עכשיו זה רק להשאיר פרטים ולהגשים את החלום'
                        BoldColor='white'
                        titleColor='white'
                        subColor='white'/>    

                    <div className="center">
                        <form onSubmit={ this.handleSubmit } 
                          autoComplete='off' 
                          method='POST' 
                          className="row col-12 col-lg-8 px-0">
                            <div className='p-2 col-6'>
                                { this.renderInput('name', 'שם פרטי *', false, 'text', 'form-control m-0 text-rtl border border-dark', '')}
                            </div>
                            <div className="p-2 col-6">
                                { this.renderInput('lastName', 'שם משפחה *', false, 'text', 'form-control text-rtl border border-dark', '')}
                            </div>
                            <div className="p-2 col-6">
                                { this.renderInput('email', 'כתובת מייל *', false, 'text', 'form-control text-rtl border border-dark', '')}
                            </div>
                            <div className="p-2 col-6">
                                { this.renderInput('phone', 'טלפון', false, 'text', 'form-control text-rtl border border-dark', '')}
                            </div>
                            
                           <div className="p-2 col-12">
                                { this.renderInput('subject', 'נושא *', false, 'text', 'form-control text-rtl border border-dark', '')}
                           </div>

                           <div className="p-2 col-12">
                               {this.renderTextarea('message', 'הודעה *')}
                           </div>

                           <div className="p-2 col-12 mb-4">
                                { this.renderButton('שלח', 'btn btn-outline-light pb-3 border border-light w-100') }
                           </div>
                           
                        </form>
                    </div>
        
                </div>
            </div>
         );
    }
}
 
export default ContectUs;
