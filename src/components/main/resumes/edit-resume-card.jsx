import React from 'react';
import Form from '../../common/form';
import Titles from '../../common/titles';
import Joi from "joi-browser";
import { getResume, editResume, editResumeWithPics } from '../../../services/resumeService';
import { toast } from 'react-toastify';


class EditTeamMember extends Form {

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
        _id: Joi.string(),
        firstName: Joi.string().required().min(2).max(255).label('firstName'),
        lastName: Joi.string().required().min(2).max(255).label('lastName'),
        subTitle: Joi.string().required().min(2).max(255).label('subTitle'),
        firstP: Joi.string().required().min(2).max(1024).label('subTitle'),
        secondp:  Joi.string().required().min(2).max(1024).label('subTitle'),
        thirdP: Joi.string().required().min(2).max(1024).label('subTitle'),
        fourthP: Joi.string().required().min(2).max(1024).label('subTitle'),
        profileUrl: Joi.string().min(2).max(255),
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
            firstName:resume.firstName, 
            lastName: resume.lastName, 
            subTitle: resume.subTitle,
            firstP: resume.firstP,
            secondp: resume.secondp,
            thirdP:resume.thirdP,
            fourthP:resume.fourthP,
            // profileUrl:resume.profileUrl,
            profileAlt:resume.profileAlt
         }
     }

    checkLastName = (lastName) => {
        return lastName.replace(/\s/, "-")
     }
     
    upload = () => {

        const resumeId = this.props.match.params.id
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
        formData.append("id", resumeId );

        for(let x = 0; x < images.length; x++){
            for (let i of images[x]) {
                formData.append("images", i);
            }
        }
        return formData
      }

     doSubmit = async ()=>{
        const  dataFromState  = {...this.state.data};
        const resumeId = this.props.match.params.id; 
        const { data } = await getResume(resumeId);
      
        try{
            if(dataFromState.profileUrl === undefined){
                dataFromState.profileUrl = data.profileUrl
                await editResume(dataFromState);
                toast('איש הצוות עודכן');
                return this.props.history.replace('/private-area/resume-search-page')
            }
            const formData = this.upload()
            await editResumeWithPics(formData);
            toast('איש הצוות עודכן');
            return this.props.history.replace('/private-area/resume-search-page')    
        }catch(err){
                console.log(err.message);
        }
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
                        { this.renderInput('firstName', 'שם פרטי *', true ) }
                        { this.renderInput('lastName', 'שם משפחה *', true ) }
                        { this.renderInput('subTitle', ' הגדרת תפקיד בחברה *' ) }
                        { this.renderTextarea('firstP', 'השכלה *') }
                        { this.renderTextarea('secondp', 'עבודה כשכירה בתחום *') }
                        { this.renderTextarea('thirdP', 'עבודה כעצמאית בתחום *') }
                        { this.renderTextarea('fourthP', 'תפקיד ועיסוק בחברה *') }
                        { this.renderFileInputEdit('profileUrl', 'עדכן תמונת פרופיל - שדה זה  אופציונאלי') }
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