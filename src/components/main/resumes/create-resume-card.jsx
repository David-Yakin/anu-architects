import React from 'react';
import Joi from "joi-browser";
import Form from '../../common/form';
import Titles from '../../common/titles';
import { createResume } from '../../../services/resumeService';
import { toast } from 'react-toastify';

class CreatTeamMemberCard extends Form {

    state = { 
        data: { 
            title:'', 
            subTitle: '',
            firstP: '',
            secondp: '',
            thirdP:'',
            fourthP:'',
            profileUrl:'',
            profileAlt:''
         },
        errors: {},
     }

     schema = { 
        title: Joi.string().required().min(2).max(255).label('title'),
        subTitle: Joi.string().required().min(2).max(255).label('subTitle'),
        firstP: Joi.string().required().min(2).max(1024).label('firstP'),
        secondp:  Joi.string().required().min(2).max(1024).label('secondp'),
        thirdP: Joi.string().required().min(2).max(1024).label('thirdP'),
        fourthP: Joi.string().required().min(2).max(1024).label('fourthP'),
        profileUrl: Joi.string().required().min(2).max(255).label('profileUrl'),
        profileAlt: Joi.string().required().min(2).max(255).label('profileAlt'),
     }

     doSubmit = async ()=>{
         try{
            const data  = {...this.state.data};
            await createResume(data);
            toast('הכרטיס של איש הצוות נוצר');
            this.props.history.replace('/private-area/resume-search-page') ;

         }catch(ex){
            this.setState({ errors: { title: 'קרתה שגיאה בשמירת איש הצוות- איש הצוות לא נשמר' }});
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
                        { this.renderInput('title', 'שם מלא *' ) }
                        { this.renderInput('subTitle', ' הגדרת תפקיד בחברה *' ) }
                        { this.renderTextarea('firstP', 'השכלה *') }
                        { this.renderTextarea('secondp', 'עבודה כשכירה בתחום *') }
                        { this.renderTextarea('thirdP', 'עבודה כעצמאית בתחום *') }
                        { this.renderTextarea('fourthP', 'תפקיד ועיסוק בחברה *') }
                        { this.renderInput('profileUrl', 'תמונת פרופיל *') }
                        { this.renderInput('profileAlt', 'תיאור תמונת פרופיל לצורך נגישות *') }
                        { this.renderButton('צור איש צוות', 'btn btn-lg btn-outline-dark btn-block my-3') }
                    </form>
                </div>
            </div>                    
        </div>
         );
    }
}
 
export default CreatTeamMemberCard;