import React from 'react';
import Joi from "joi-browser";
import Titles from '../../common/titles';
import Form from '../../common/form';
import { getProject, editProject } from '../../../services/projectService';
import { toast } from 'react-toastify';

class EditProject extends Form {
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
         _id: Joi.string(),
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
        desBefore: Joi.string().min(2).max(255).label('desBefore'),
        urlSketch: Joi.string().min(2).max(255).label('urlSketch'),
        altSketch: Joi.string().min(2).max(255).label('altSketch'),
        desSketch: Joi.string().min(2).max(255).label('desSketch'),
        urlImaging: Joi.string().min(2).max(255).label('urlImaging'),
        altImaging: Joi.string().min(2).max(255).label('altImaging'),
        desImaging: Joi.string().min(2).max(255).label('desImaging'),
        urlConstraction: Joi.string().min(2).max(255).label('urlConstraction'),
        altConstraction: Joi.string().min(2).max(255).label('altConstraction'),
        desConstraction: Joi.string().min(2).max(255).label('desConstraction'),
        urlGallery: Joi.string().min(2).max(255).label('urlGallery'),
        altGallery: Joi.string().min(2).max(255).label('altGallery'),
     }

    async componentDidMount(){
        const projectId = this.props.match.params.id;
        const { data } = await getProject(projectId);
        this.setState({ data: this.mapToNewModel(data)});
     }

     mapToNewModel(project){
        return {
            _id: project._id,
            name:project.name, 
            year: project.year,
            size:project.size,
            category:project.category,
            description:project.description,
            country:project.country,
            city:project.city,
            cardUrl:project.cardUrl,
            cardAlt: project.cardAlt,
            urlPamorama:project.urlPamorama,
            altPamorama:project.altPamorama,
            urlBefore:project.urlBefore,
            altBefore:project.altBefore,
            desBefore:project.desBefore,
            urlSketch:project.urlSketch,
            altSketch:project.altSketch,
            desSketch:project.desSketch,
            urlImaging:project.urlImaging,
            altImaging:project.altImaging,
            desImaging:project.desImaging,
            urlConstraction:project.urlConstraction,
            altConstraction:project.altConstraction,
            desConstraction:project.desConstraction,
            urlGallery:project.urlGallery,
            altGallery:project.altGallery
        };
     }

     doSubmit = async ()=>{
        const { data } = this.state;
        await editProject(data);
        toast('הפרויקט עודכן');
        this.props.history.replace('/private-area/projects-search-page');
     };

    render() { 
 
        return ( 
            <div className="edit-project">

                <Titles titleBold='ערוך'
                                 title= 'את הפרויקט'
                                 subTitle='כאן תוכל לערוך את הפרויקט'
                                 BoldColor='white'
                                 subColor='white'/>

                 <div className="container">
                    <div className="center">
                        <form className='col-10 bg-light rounded mb-4 pt-2' 
                         onSubmit={ this.handleSubmit } 
                         autoComplete='off' 
                         method='POST'>
                            { this.renderInput('name', 'שם הפרויקט *' ) }
                            { this.renderInput('year', ' השנה בה הסתיים הפרויקט *', 'number' ) }
                            { this.renderInput('size', 'גודל הנכס במטר רבוע *', 'number') }
                            { this.renderInput('category', 'סוג הנכס *' ) }
                            { this.renderInput('description', 'תיאור הנכס *' ) }
                            { this.renderInput('country', 'הארץ בה מצוי הנכס  *' ) }
                            { this.renderInput('city', 'העיר בה מצוי הנכס  *' ) }
                            { this.renderInput('cardUrl', 'תמונה לכרטיס הפרוייקט *' ) }
                            { this.renderInput('cardAlt', 'תיאור התמונה לכרטיס הפרוייקט *' ) }
                            { this.renderInput('urlPamorama', 'תמונה של הנכס מבחוץ *' ) }
                            { this.renderInput('altPamorama', 'תיאור של התמונה לצורך נגישות *' ) }
                            { this.renderInput('urlBefore', 'התמונה של הנכס לפני הבניה/ השיפוץ' ) }
                            { this.renderInput('altBefore', 'תיאור של התמונה לצורך נגישות' ) }
                            { this.renderInput('desBefore', 'תיאור מצב הנכס לפני תהליך הבניה/ השיפוץ' ) }
                            { this.renderInput('urlSketch', 'סקיצה של הפרויקט' ) }
                            { this.renderInput('altSketch', 'תיאור של הסקיצה לצורך נגישות' ) }
                            { this.renderInput('desSketch', 'תיאור תהליך העבודה על הסקיצה' ) }
                            { this.renderInput('urlImaging', 'הדמייה של הפרויקט' ) }
                            { this.renderInput('altImaging', 'תיאור של ההדמייה לצורך נגישות' ) }
                            { this.renderInput('desImaging', 'תיאור תהליך העבודה על ההדמייה' ) }
                            { this.renderInput('urlConstraction', 'תמונה מהשיפוצים / הבנייה של הפרויקט' ) }
                            { this.renderInput('altConstraction', 'תיאור של התמונה לצורך נגישות' ) }
                            { this.renderInput('desConstraction', 'תיאור תהליך הבנייה / השיפוץ' ) }
                            { this.renderInput('urlGallery', 'תמונה לגלריית התמונות' ) }
                            { this.renderInput('altGallery', 'תיאור של התמונה לצורך נגישות' ) }            
                            { this.renderButton('שלח', 'btn btn-lg btn-outline-dark btn-block my-3') }
                        </form>
                    </div>
                 </div>                    
         </div>
         );
    }
}
 
export default EditProject;