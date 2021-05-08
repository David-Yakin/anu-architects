import React from 'react';
import Joi from "joi-browser";
import Form from '../../common/form';
import Titles from '../../common/titles';
import { createResume } from '../../../services/resumeService';
import { toast } from 'react-toastify';

class CreatResume extends Form {
    state = { 
        data: { 
            firstName:'', 
            lastName: '',
            subTitle: '',
            firstP: '',
            secondp: '',
            thirdP:'',
            fourthP:'',
            profileUrl:'',
            profileAlt:''
         },
        errors: {},
        images: []
     }

     schema = { 
        firstName: Joi.string().required().min(2).max(255).label('firstName'),
        lastName: Joi.string().required().min(2).max(255).label('lastName'),
        subTitle: Joi.string().required().min(2).max(255).label('subTitle'),
        firstP: Joi.string().required().min(2).max(1024).label('firstP'),
        secondp:  Joi.string().required().min(2).max(1024).label('secondp'),
        thirdP: Joi.string().required().min(2).max(1024).label('thirdP'),
        fourthP: Joi.string().required().min(2).max(1024).label('fourthP'),
        profileUrl: Joi.string().required().min(2).max(255).label('profileUrl'),
        profileAlt: Joi.string().required().min(2).max(255).label('profileAlt'),
     }

     checkLastName = (lastName) => {
        return lastName.replace(/\s/g, "-")
     }

     upload = () => {
        const {firstName, lastName, subTitle,firstP,secondp,thirdP,fourthP, profileUrl, profileAlt} = this.state.data;
        const {images} = this.state;
        const lastNameChecked = this.checkLastName(lastName.trim());

        const formData = new FormData();
        formData.append("firstName", firstName.trim());
        formData.append("lastName", lastNameChecked);
        formData.append("subTitle", subTitle.trim());
        formData.append("firstP", firstP.trim());
        formData.append("secondp", secondp.trim());
        formData.append("thirdP", thirdP.trim());
        formData.append("fourthP", fourthP.trim());
        formData.append("profileUrl", profileUrl);
        formData.append("profileAlt", profileAlt.trim());

        for(let x = 0; x < images.length; x++){
            for (let i of images[x]) {
                formData.append("images", i);
            }
        }
        return formData
      }

     doSubmit = async (e)=>{
        const formData = this.upload()
         try{
            await createResume(formData);
            toast('הכרטיס של איש הצוות נוצר');
            this.props.history.replace('/private-area/resume-search-page');
         }catch(err){
             toast('ארעה שגיאה - איש הצוות לא נשמר')
            this.setState({ errors: { profileAlt: 'אנא וודא כי איש הצוות לא נמצא כבר במאגר המידע' }});
         }
     };

    render() { 
        return ( 
            <div className="create-resume">

            <Titles titleBold='צור'
                    title= 'איש צוות חדש'
                    subTitle='כאן תוכל ליצור איש צוות חדש' 
                    subColor='lightgray' />
           
            <div className="container">
                <div className="center">
                    <form className='col-10 bg-light rounded mb-4 pt-2' 
                     onSubmit={ this.handleSubmit } 
                     autoComplete='off' 
                     method='POST'>
                        { this.renderInput('firstName', 'שם פרטי *' ) }
                        { this.renderInput('lastName', 'שם משפחה *' ) }
                        { this.renderInput('subTitle', ' הגדרת תפקיד בחברה *' ) }
                        { this.renderTextarea('firstP', 'השכלה *') }
                        { this.renderTextarea('secondp', 'עבודה כשכירה בתחום *') }
                        { this.renderTextarea('thirdP', 'עבודה כעצמאית בתחום *') }
                        { this.renderTextarea('fourthP', 'תפקיד ועיסוק בחברה *') }
                        { this.renderFileInput('profileUrl', 'העלה תמונת פרופיל *') }
                        { this.renderInput('profileAlt', 'תיאור תמונת פרופיל לצורך נגישות *') }
                        { this.renderButton('צור איש צוות', 'btn btn-lg btn-outline-dark btn-block my-3') }
                    </form>
                </div>
            </div>                    
        </div>
         );
    }
}
 
export default CreatResume;