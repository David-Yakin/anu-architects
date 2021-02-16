import React from 'react';
import Joi from "joi-browser";
import Form from '../../common/form';
import Titles from '../../common/titles';
import { editQna, getQna } from '../../../services/qnaService';
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
        _id: Joi.string(),
        question: Joi.string().required().min(2).max(255).label('question'),
        title: Joi.string().required().min(2).max(255).label('title'),
        text: Joi.string().required().min(2).max(255).label('text'),
        img: Joi.string().required().min(2).max(1024).label('img'),
        alt: Joi.string().required().min(2).max(255).label('alt'),
     }

     async componentDidMount(){
         const qnaId = this.props.match.params.id;
         const { data } = await getQna(qnaId);
        const {question, answer, _id} = data;
        const { title, text, img, alt, } = answer;
        const newData = { question, title, text, img, alt, _id }
        this.setState({ data: this.mapToNewModel(newData)});
     }

     mapToNewModel(qna){
        return {
            _id: qna._id,
            question:qna.question, 
            title: qna.title,
            text:qna.text,
            img:qna.img,
            alt:qna.alt,
        };
     }

     doSubmit = async ()=>{
         
         try{
            const { data } = this.state;
            await editQna(data);
            toast('השאלה והתשובה עודכנו');
            this.props.history.replace('/private-area/qna-search-page') ;

         }catch(ex){
            this.setState({ errors: { title: '!קרתה שגיאה בשמירת השאלה והתשובה העדכון לא נשמר' }});
         }
     };

    render() { 
        return ( 
            <div className="create-qna">

            <Titles titleBold='ערוך'
                    title= 'שאלה ותשובה '
                    subTitle='כאן תוכל לערוך את השאלה והתשובה ' />
           
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
                        { this.renderButton('עדכן את השאלה והתשובה', 'btn btn-lg btn-outline-dark btn-block my-3') }
                    </form>
                </div>
            </div>                    
        </div>
         );
    }
}
 
export default CreatQna;