import React from 'react';
import Joi from "joi-browser";
import Form from '../common/form';
import { Redirect } from "react-router-dom";
import { toast } from 'react-toastify';
import { getCurrentUser, getUser, editUser } from "../../services/userService";

class UpdateUser extends Form {
    state = { 
        data: { 
            name:'', 
            lastName: '',
            email: '', 
            phone:'',
            country: '',
            city: '',
            street: '',
            houseNumber : '',
            zip: '',
         },
        errors: {}
     }

    schema = { 
        _id: Joi.string(),
        name: Joi.string().required().min(2).max(255).label('name'),
        lastName: Joi.string().required().min(2).max(255).label('last name'),
        phone: Joi.string().required().min(9).max(14).label('phone'),
        country: Joi.string().required().min(2).max(255).label('country'),
        city: Joi.string().required().min(2).max(255).label('city'),
        street: Joi.string().required().min(2).max(255).label('street'),
        houseNumber: Joi.string().required().min(2).max(255).label('houseNumber'),
        zip: Joi.string().required().min(2).max(255).label('zip'),
     }

     async componentDidMount(){
        const userId = this.props.match.params.id;
        const { data } = await getUser(userId);
        this.setState({ data: this.mapToNewModel(data)});
     }

    mapToNewModel({ _id, name, lastName, phone, adress }){
       return {
           _id: _id,
           name:name, 
           lastName: lastName,
           phone:phone,
           country: adress.country,
           city: adress.city,
           street: adress.street,
           houseNumber: adress.houseNumber,
           zip: adress.zip
       };
    }

     doSubmit = async ()=>{
        const data  ={...this.state.data};
  
        try{
          await editUser(data); 
          toast(`${data.name} עדכון הפרטים שלך נשמר בהצלחה`);
          this.props.history.replace('/private-area/my-projects');
        } 
        catch(ex){
          if( ex.response && ex.response.status === 400){
            this.setState({ errors: { email: 'המייל הזה תפוס' }});
          }
        }
       }

    render() { 
        let user = getCurrentUser();
        if(user && user.admin) return <Redirect to="/private-area/users" />
       
        return ( 
            <div className="container-fluid sign-up">
                <div className="center ">
                    <form onSubmit={ this.handleSubmit } 
                          autoComplete='off' 
                          method='POST' 
                          className="border border-light rounded p-4 bg-light col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3">

                        <h1 className="h3 mb-3 font-weight-normal text-dark text-center">עדכון פרטים</h1>

                        { this.renderInput('name', 'שם פרטי' ) }
                        { this.renderInput('lastName', 'שם משפחה' ) }
                        { this.renderInput('phone','טלפון', 'phone') }

                        { this.renderInput('country','ארץ') }
                        { this.renderInput('city','עיר') }
                        { this.renderInput('street','רחוב') }
                        { this.renderInput('houseNumber','מספר בית') }
                        { this.renderInput('zip','מיקוד') }

                        { this.renderButton('עדכן', 'btn btn-lg btn-outline-dark btn-block') }

                    </form>
                </div>
            </div>
         );
    }
}
 
export default UpdateUser;