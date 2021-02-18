import React from 'react';
import Joi from "joi-browser";
import Form from '../../common/form';
import Titles from '../../common/titles';
import { createQna } from '../../../services/qnaService';
import { toast } from 'react-toastify';

class CreatQna extends Form {

    state = { 

        data: { 
            question: '',
            title:'', 
            text: '',
            img: '',
            alt:'',
           
         },
        errors: {},
     }


     schema = { 
        question: Joi.string().required().min(2).max(255).label('question'),
        title: Joi.string().required().min(2).max(255).label('title'),
        text: Joi.string().required().min(2).max(255).label('text'),
        img: Joi.string().required().min(2).max(1024).label('img'),
        alt: Joi.string().required().min(2).max(255).label('alt'),
     }

     doSubmit = async ()=>{

         try{
            const data  = {...this.state.data};
            await createQna(data);
            toast('השאלה והתשובה נוצרו');
            this.props.history.replace('/private-area/qna-search-page') ;

         }catch(ex){
            this.setState({ errors: { title: 'קרתה שגיאה בשמירת השאלה והיא לא נשמרה' }});
         }
     };

    render() { 
        return ( 
            <div className="create-qna">

            <Titles titleBold='צור'
                    title= 'שאלה ותשובה חדשות'
                    subTitle='כאן תוכל ליצור שאלות ותשובות חדשות' />
           
            <div className="container">
                <div className="center">
                    <form className='col-10 bg-light rounded mb-4 pt-2' 
                     onSubmit={ this.handleSubmit } 
                     autoComplete='off' 
                     method='POST'>
                        { this.renderInput('question', 'השאלה *') }
                        { this.renderInput('title', 'כותרת התשובה *' ) }
                        { this.renderTextarea('text', '  התשובה המלאה *' ) }
                        { this.renderInput('img', 'כתובת תמונת התשובה *') }
                        { this.renderInput('alt', 'הסבר על התמונה לצורך נגישות *') }
                        { this.renderButton('צור שאלה ותשובה', 'btn btn-lg btn-outline-dark btn-block my-3') }
                    </form>
                </div>
            </div>                    
        </div>
         );
    }
}
 
export default CreatQna;