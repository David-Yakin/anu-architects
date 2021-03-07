import React from 'react';
import Form from '../../common/form';
import Titles from '../../common/titles';
import Joi from "joi-browser";
import { getResume, editResume } from '../../../services/resumeService';
import { toast } from 'react-toastify';


class EditTeamMember extends Form {

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
        _id: Joi.string(),
        title: Joi.string().required().min(2).max(255).label('title'),
        subTitle: Joi.string().required().min(2).max(255).label('subTitle'),
        firstP: Joi.string().required().min(2).max(1024).label('subTitle'),
        secondp:  Joi.string().required().min(2).max(1024).label('subTitle'),
        thirdP: Joi.string().required().min(2).max(1024).label('subTitle'),
        fourthP: Joi.string().required().min(2).max(1024).label('subTitle'),
        profileUrl: Joi.string().required().min(2).max(255),
        profileAlt: Joi.string().required().min(2).max(255),
     }

     async componentDidMount(){
        const resumeId = this.props.match.params.id; 
        const { data } = await getResume(resumeId);
        this.setState({ data: this.mapToNewModel(data)});
     }

     mapToNewModel(resume){
         return {
            _id: resume._id,
            title: resume.title, 
            subTitle: resume.subTitle,
            firstP: resume.firstP,
            secondp: resume.secondp,
            thirdP:resume.thirdP,
            fourthP:resume.fourthP,
            profileUrl:resume.profileUrl,
            profileAlt:resume.profileAlt
         }
     }

     doSubmit = async ()=>{
        const { data } = this.state;
        await editResume(data);
        toast('איש הצוות עודכן');
        this.props.history.replace('/private-area/resume-search-page');
     };
     
    render() { 
        
        return ( 
            <div className="edit-resume">

            <Titles titleBold='ערוך  '
                    title= 'איש הצוות'
                    subTitle='כאן תוכל לערוך איש צוות חדש'
                    subColor='white'
                    BoldColor='white'
                    titleColor='white'/>
           
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
                        { this.renderButton('שלח', 'btn btn-lg btn-outline-dark btn-block my-3') }
                    </form>
                </div>
            </div>                    
        </div>
         );
    }
}
 
export default EditTeamMember;