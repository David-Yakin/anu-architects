import React from 'react';
import Titles from '../../common/titles';
import Form from '../../common/form';
import Joi from "joi-browser";
import { createBlog } from '../../../services/blogService';
import { toast } from 'react-toastify';

class CeateBlog extends Form {
    state = { 
        data: { 
            title:'', 
            subTitle: '',
            author:'',
            category:'',

            cardUrl:'',
            cardAlt: '',

            titleImgUrl:'',
            titleImgAlt:'',
            titleImgCredit:'',

            endImgUrl:'',
            endImgAlt:'',
            endImgCredit:'',

            firstInnerTitle:'',
            firstP:'',
            secondP:'',
            thirdP:'',

            landscapeImgUrl:'',
            landscapeImgAlt:'',
            landscapeImgCredit:'',
            secondInnerTitle:'',
            foruthP:'',
            fifthP:'',
            sixthP:'',

            profileImgUrl:'',
            profileImgAlt:'',
            profileImgCredit:'',
            thirdInnerTitle:'',
            seventhP:'',
            eighthP:'',
            ninthP:'',

         },
        errors: {},
     }

     schema = { 
        title: Joi.string().required().min(2).max(255).label('title'),
        subTitle: Joi.string().required().min(2).max(255).label('subTitle'),
        author: Joi.string().required().min(2).max(255).label('author'),
        category: Joi.string().required().min(2).max(255).label('category'),

        cardUrl: Joi.string().required().min(2).max(255).label('cardUrl'),
        cardAlt: Joi.string().required().min(2).max(255).label('cardAlt'),

        titleImgUrl: Joi.string().required().min(2).max(255).label('titleImgUrl'),
        titleImgAlt: Joi.string().required().min(2).max(255).label('titleImgAlt'),
        titleImgCredit: Joi.string().required().min(2).max(255).label('titleImgCredit'),

        endImgUrl: Joi.string().required().min(2).max(255).label('endImgUrl'),
        endImgAlt: Joi.string().required().min(2).max(255).label('endImgAlt'),
        endImgCredit: Joi.string().required().min(2).max(255).label('endImgCredit'),

        firstInnerTitle: Joi.string().required().min(2).max(255).label('firstInnerTitle'),
        firstP: Joi.string().required().min(2).max(1024).label('firstP'),
        secondP: Joi.string().required().min(2).max(1024).label('secondP'),
        thirdP: Joi.string().required().min(2).max(1024).label('thirdP'),

        landscapeImgUrl: Joi.string().required().min(2).max(255).label('landscapeImgUrl'),
        landscapeImgAlt: Joi.string().required().min(2).max(255).label('landscapeImgAlt'),
        landscapeImgCredit: Joi.string().required().min(2).max(255).label('landscapeImgCredit'),
        secondInnerTitle: Joi.string().required().min(2).max(255).label('secondInnerTitle'),
        foruthP: Joi.string().required().min(2).max(1024).label('foruthP'),
        fifthP: Joi.string().required().min(2).max(1024).label('fifthP'),
        sixthP: Joi.string().required().min(2).max(1024).label('sixthP'),

        profileImgUrl: Joi.string().required().min(2).max(255).label('profileImgUrl'),
        profileImgAlt: Joi.string().required().min(2).max(255).label('profileImgAlt'),
        profileImgCredit: Joi.string().required().min(2).max(255).label('profileImgCredit'),
        thirdInnerTitle: Joi.string().required().min(2).max(255).label('thirdInnerTitle'),
        seventhP: Joi.string().required().min(2).max(1024).label('seventhP'),
        eighthP: Joi.string().required().min(2).max(1024).label('eighthP'),
        ninthP: Joi.string().required().min(2).max(1024).label('ninthP'),

     }

     doSubmit = async ()=>{
         console.log('do submit');
        try{
            
            const data  = {...this.state.data};
            await createBlog(data);
            toast('המאמר נוצר');
            this.props.history.replace('/private-area/blogs-search-page') ;

         }catch(ex){
            toast('המאמר לא נשמר קרתה שגיאה בשמירת המאמר')
            this.setState({ errors: { title:  `המאמר לא נשמר קרתה שגיאה בשמירת המאמר: ${ex}` }});
         }
     };

    render() { 

        return (               
            <div className="create-blog">

                <Titles titleBold='צור'
                        title= 'מאמר חדש'
                        subTitle='כאן תוכל ליצור מאמר חדש, את השדות שמסומנים בכוכבית חובה למלא'
                        subColor='white'
                        BoldColor='white'
                        titleColor='white'/>
               
                <div className="container">
                    <div className="center">
                        <form className='col-10 bg-light rounded mb-4 pt-2' 
                         onSubmit={ this.handleSubmit } 
                         autoComplete='off' 
                         method='POST'>
                            { this.renderInput('title', 'שם המאמר *' ) }
                            { this.renderInput('subTitle', ' כותרת משנה של המאמר *' ) }
                            { this.renderInput('author', 'כותב המאמר *') }

                            { this.renderSelectBox('category', 'בחר קטגוריה', [
                                    {text:'ארכיטקטורה', value:'architecture' },
                                    {text:'עיצוב פנים', value:'exterior-design' }, 
                                    {text:'ניהול פרויקטים', value:'Projects-Management' }]) }

                            { this.renderInput('cardUrl', 'כתובת תמונה לכרטיס המאמר ביחס של 16:9 *') }
                            { this.renderInput('cardAlt', 'תיאור התמונה לכרטיס המאמר לצורך נגישות') }

                            { this.renderInput('titleImgUrl', 'כתובת התמונה ראשית בגודל - 1920X650 *') }
                            { this.renderInput('titleImgAlt', 'תיאור התמונה הראשית *') }
                            { this.renderInput('titleImgCredit', 'קרדיט לצלם של התמונה הראשית') }
                            
                            { this.renderInput('endImgUrl', 'כתובת התמונה סופית בגודל - 1920X800 *') }
                            { this.renderInput('endImgAlt', 'תיאור התמונה סופית *') }
                            { this.renderInput('endImgCredit', 'קרדיט לצלם של התמונה סופית') }

                            { this.renderInput('firstInnerTitle', 'כותרת ראשונה בגוף המאמר') }
                            { this.renderTextarea('firstP', 'פיסקה ראשונה') }
                            { this.renderTextarea('secondP', 'פיסקה שנייה') }
                            { this.renderTextarea('thirdP', 'פיסקה שלישית') }

                            { this.renderInput('landscapeImgUrl', 'כתובת התמונה שנייה') }
                            { this.renderInput('landscapeImgAlt', 'תיאור התמונה שנייה') }
                            { this.renderInput('landscapeImgCredit', 'קרדיט לצלם של התמונה שנייה') }
                            { this.renderInput('secondInnerTitle', 'כותרת שנייה בגוף המאמר') }
                            { this.renderTextarea('foruthP', 'פיסקה רביעית') }
                            { this.renderTextarea('fifthP', 'פיסקה חמישית') }
                            { this.renderTextarea('sixthP', 'פיסקה שישית') }

                            { this.renderInput('profileImgUrl', 'כתובת התמונה השלישית') }
                            { this.renderInput('profileImgAlt', 'תיאור התמונה השלישית') }
                            { this.renderInput('profileImgCredit', 'קרדיט לצלם של התמונה השלישית') }
                            { this.renderInput('thirdInnerTitle', 'כותרת שלישית בגוף המאמר') }
                            { this.renderTextarea('seventhP', 'פיסקה שביעית') }
                            { this.renderTextarea('eighthP', 'פיסקה שמינית') }
                            { this.renderTextarea('ninthP', 'פיסקה תשיעית') }

                            { this.renderButton('צור מאמר', 'btn btn-lg btn-outline-dark btn-block my-3') }
                        </form>
                    </div>
                </div>                    
            </div>
                 
            
            );
    }
}
 
export default CeateBlog;