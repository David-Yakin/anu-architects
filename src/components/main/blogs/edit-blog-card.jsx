import React from 'react';
import Titles from '../../common/titles';
import Form from '../../common/form';
import Joi from "joi-browser";
import { getBlog, editBlog } from '../../../services/blogService';
import { toast } from 'react-toastify';

class EditBlog extends Form {
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
        _id: Joi.string(),
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

     async componentDidMount(){
        const blogId = this.props.match.params.id; 
        const { data } = await getBlog(blogId);
        this.setState({ data: this.mapToNewModel(data)});
     }

    mapToNewModel(blog){
    return {
        _id: blog._id,
        title:blog.title, 
        subTitle: blog.subTitle,
        author:blog.author,
        category:blog.category,

        cardUrl:blog.cardUrl,
        cardAlt: blog.cardAlt,

        titleImgUrl:blog.titleImgUrl,
        titleImgAlt:blog.titleImgAlt,
        titleImgCredit:blog.titleImgCredit,

        endImgUrl: blog.endImgUrl,
        endImgAlt: blog.endImgAlt,
        endImgCredit: blog.endImgCredit,

        firstInnerTitle:blog.firstInnerTitle,
        firstP:blog.firstP,
        secondP:blog.secondP,
        thirdP:blog.thirdP,

        landscapeImgUrl:blog.landscapeImgUrl,
        landscapeImgAlt:blog.landscapeImgAlt,
        landscapeImgCredit:blog.landscapeImgCredit,
        secondInnerTitle:blog.secondInnerTitle,
        foruthP:blog.foruthP,
        fifthP:blog.fifthP,
        sixthP:blog.sixthP,

        profileImgUrl:blog.profileImgUrl,
        profileImgAlt:blog.profileImgAlt,
        profileImgCredit:blog.profileImgCredit,
        thirdInnerTitle:blog.thirdInnerTitle,
        seventhP:blog.seventhP,
        eighthP:blog.eighthP,
        ninthP:blog.ninthP,
    }
}
     doSubmit = async ()=>{
         try{
            const { data } = this.state;
            await editBlog(data);
            toast('המאמר עודכן');
            this.props.history.replace('/private-area/blogs-search-page');

         }catch(ex){
            toast('המאמר לא נשמר קרתה שגיאה בשמירת המאמר')
            this.setState({ errors: { title:  `המאמר לא נשמר קרתה שגיאה בשמירת המאמר: ${ex}` }});
         }
     };

    render() { 

        return (               
            <div className="edit-blog">

                <Titles titleBold='ערוך'
                        title= 'מאמר'
                        subTitle='כאן תוכל לערוך את המאמר, את השדות שמסומנים בכוכבית חובה למלא'
                         />
               
                <div className="container">
                    <div className="center">
                        <form className='col-10 bg-light rounded mb-4 pt-2' 
                         onSubmit={ this.handleSubmit } 
                         autoComplete='off' 
                         method='POST'>
                            { this.renderInput('title', 'שם המאמר *' ) }
                            { this.renderInput('subTitle', ' כותרת משנה של המאמר *' ) }
                            { this.renderInput('author', 'כותב המאמר *') }
                            { this.renderInput('category', 'סוג הנכס *' ) }

                            { this.renderInput('cardUrl', 'כתובת תמונה לכרטיס המאמר ביחס של 16:9 *') }
                            { this.renderInput('cardAlt', 'תיאור התמונה לכרטיס המאמר לצורך נגישות') }

                            { this.renderInput('titleImgUrl', 'כתובת התמונה ראשית בגודל - 1920X650 *') }
                            { this.renderInput('titleImgAlt', 'תיאור התמונה הראשית *') }
                            { this.renderInput('titleImgCredit', 'קרדיט לצלם של התמונה הראשית') }
                            
                            { this.renderInput('endImgUrl', 'כתובת התמונה סופית בגודל - 1920X800 *') }
                            { this.renderInput('endImgAlt', 'תיאור התמונה סופית *') }
                            { this.renderInput('endImgCredit', 'קרדיט לצלם של התמונה סופית') }

                            { this.renderInput('firstInnerTitle', 'כותרת ראשונה בגוף המאמר') }
                            { this.renderInput('firstP', 'פיסקה ראשונה') }
                            { this.renderInput('secondP', 'פיסקה שנייה') }
                            { this.renderInput('thirdP', 'פיסקה שלישית') }

                            { this.renderInput('landscapeImgUrl', 'כתובת התמונה שנייה') }
                            { this.renderInput('landscapeImgAlt', 'תיאור התמונה שנייה') }
                            { this.renderInput('landscapeImgCredit', 'קרדיט לצלם של התמונה שנייה') }
                            { this.renderInput('secondInnerTitle', 'כותרת שנייה בגוף המאמר') }
                            { this.renderInput('foruthP', 'פיסקה רביעית') }
                            { this.renderInput('fifthP', 'פיסקה חמישית') }
                            { this.renderInput('sixthP', 'פיסקה שישית') }

                            { this.renderInput('profileImgUrl', 'כתובת התמונה השלישית') }
                            { this.renderInput('profileImgAlt', 'תיאור התמונה השלישית') }
                            { this.renderInput('profileImgCredit', 'קרדיט לצלם של התמונה השלישית') }
                            { this.renderInput('thirdInnerTitle', 'כותרת שלישית בגוף המאמר') }
                            { this.renderInput('seventhP', 'פיסקה שביעית') }
                            { this.renderInput('eighthP', 'פיסקה שמינית') }
                            { this.renderInput('ninthP', 'פיסקה תשיעית') }

                            { this.renderButton('שלח', 'btn btn-lg btn-outline-dark btn-block my-3') }
                        </form>
                    </div>
                </div>                    
            </div>
                 
            
            );
    }
}
 
export default EditBlog;