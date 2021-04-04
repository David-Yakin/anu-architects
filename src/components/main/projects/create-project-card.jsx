import React from 'react';
import Titles from '../../common/titles';
import Joi from "joi-browser";
import Form from '../../common/form';
import { createProject } from '../../../services/projectService';
import { toast } from 'react-toastify';


class CreateProject extends Form {
    state = { 
   

        data: { 
            name:'', 
            year: '',
            size:'',
            category:'',
            description:'',
            country:'',
            city:'',
            cardUrl:'',
            cardAlt: '',
            urlPamorama:'',
            altPamorama:'',
            urlBefore:'',
            altBefore:'',
            desBefore:'',
            urlSketch:'',
            altSketch:'',
            desSketch:'',
            urlImaging:'',
            altImaging:'',
            desImaging:'',
            urlConstraction:'',
            altConstraction:'',
            desConstraction:'',
            urlGallery:'',
            altGallery:''
         },
        errors: {},
     }

     schema = { 
    
        name: Joi.string().required().min(2).max(255).label('name'),
        year: Joi.string().required().min(2).max(4).label('year'),
        size: Joi.string().required().min(2).max(255).label('size'),
        category: Joi.string().required().min(2).max(255).label('category'),
        description: Joi.string().required().min(2).max(1024).label('description'),
        country: Joi.string().required().min(2).max(255).label('country'),
        city: Joi.string().required().min(2).max(255).label('city'),
        cardUrl: Joi.string().required().min(2).max(255),
        cardAlt: Joi.string().required().min(2).max(255),
        urlPamorama: Joi.string().required().min(2).max(255).label('urlPamorama'),
        altPamorama: Joi.string().required().min(2).max(255).label('altPamorama'),
        urlBefore: Joi.string().min(2).max(255).label('urlBefore'),
        altBefore: Joi.string().min(2).max(255).label('altBefore'),
        desBefore: Joi.string().min(2).max(1024).label('desBefore'),
        urlSketch: Joi.string().min(2).max(255).label('urlSketch'),
        altSketch: Joi.string().min(2).max(255).label('altSketch'),
        desSketch: Joi.string().min(2).max(1024).label('desSketch'),
        urlImaging: Joi.string().min(2).max(255).label('urlImaging'),
        altImaging: Joi.string().min(2).max(255).label('altImaging'),
        desImaging: Joi.string().min(2).max(1024).label('desImaging'),
        urlConstraction: Joi.string().min(2).max(255).label('urlConstraction'),
        altConstraction: Joi.string().min(2).max(255).label('altConstraction'),
        desConstraction: Joi.string().min(2).max(1024).label('desConstraction'),
        urlGallery: Joi.string().min(2).max(1024).label('urlGallery'),
        altGallery: Joi.string().min(2).max(255).label('altGallery'),
     }

     doSubmit = async ()=>{
         try{
            const data  = {...this.state.data};
            await createProject(data);
            toast('הפרויקט נוצר');
            this.props.history.replace('/private-area/projects-search-page') ;

         }catch(ex){
            this.setState({ errors: { title: 'קרתה שגיאה בשמירת הפרויקט - הפרויקט לא נשמר' }});
              }
     };

    // fileSelectedHandler = event => {
    //     this.setState({ selectedImage: event.target.files[0] })

    //     };

    // fileUploadHandler = () => {
    //     const selectedImage  = {...this.state.selectedImage};
    //     selectedImage.folder = "projects";
    //     uploadImage(selectedImage);
    //     }

    render() { 
        return (    
                <div className="create-project">

                    <Titles titleBold='צור'
                            title= 'פרויקט חדש'
                            subTitle='כאן תוכל ליצור פרויקט חדש, את השדות שמסומנים בכוכבית חובה למלא' />
                   
                    <div className="container">
                        <div className="center">
                            <form className='col-10 bg-light rounded mb-4 pt-2' 
                             onSubmit={ this.handleSubmit } 
                             autoComplete='off' 
                             method='POST'>
                                
                                { this.renderInput('name', 'שם הפרויקט *' ) }
                                { this.renderInput('year', ' השנה בה הסתיים הפרויקט *', 'number' ) }
                                { this.renderInput('size', 'גודל הנכס במטר רבוע *', 'number') }
                                { this.renderSelectBox('category', 'בחר קטגוריה', [
                                    {text:'דירה', value:'apartment' },
                                    {text:'וילה', value:'villa' }, 
                                    {text:'בניין מגורים', value:'Building' },
                                    {text:'קומפלקס דירות', value:'apartment-complex' },
                                    {text:'מלון', value:'hotel' }
                                    ]) }
                                { this.renderTextarea('description', 'תיאור הנכס *' ) }
                                { this.renderInput('country', 'הארץ בה מצוי הנכס  *' ) }
                                { this.renderInput('city', 'העיר בה מצוי הנכס  *' ) }
                                { this.renderInput('cardUrl', 'תמונה לכרטיס הפרוייקט *' ) }
                                { this.renderInput('cardAlt', 'תיאור התמונה לכרטיס הפרוייקט *' ) }
                                { this.renderInput('urlPamorama', 'תמונה של הנכס מבחוץ *' ) }
                                { this.renderInput('altPamorama', 'תיאור של התמונה לצורך נגישות *' ) }
                                { this.renderInput('urlBefore', 'התמונה של הנכס לפני הבניה/ השיפוץ' ) }
                                { this.renderInput('altBefore', 'תיאור של התמונה לצורך נגישות' ) }
                                { this.renderTextarea('desBefore', 'תיאור מצב הנכס לפני תהליך הבניה/ השיפוץ' ) }
                                { this.renderInput('urlSketch', 'סקיצה של הפרויקט' ) }
                                { this.renderInput('altSketch', 'תיאור של הסקיצה לצורך נגישות' ) }
                                { this.renderTextarea('desSketch', 'תיאור תהליך העבודה על הסקיצה' ) }
                                { this.renderInput('urlImaging', 'הדמייה של הפרויקט' ) }
                                { this.renderInput('altImaging', 'תיאור של ההדמייה לצורך נגישות' ) }
                                { this.renderTextarea('desImaging', 'תיאור תהליך העבודה על ההדמייה' ) }
                                { this.renderInput('urlConstraction', 'תמונה מהשיפוצים / הבנייה של הפרויקט' ) }
                                { this.renderInput('altConstraction', 'תיאור של התמונה לצורך נגישות' ) }
                                { this.renderTextarea('desConstraction', 'תיאור תהליך הבנייה / השיפוץ' ) }
                                { this.renderInput('urlGallery', 'תמונה לגלריית התמונות' ) }
                                { this.renderInput('altGallery', 'תיאור של התמונה לצורך נגישות' ) }
                                { this.renderButton('צור פרויקט', 'btn btn-lg btn-outline-dark btn-block my-3') }
                            </form>
                        </div>
                    </div>                    
                </div>
         );
    }
}
 
export default CreateProject;