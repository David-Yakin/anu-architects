import React from "react";
import Titles from "../../common/titles";
import Joi from "joi-browser";
import Form from "../../common/form";
import { createProject } from "../../../services/projectService";
import { toast } from "react-toastify";

class CreateProject extends Form {
  state = {
    data: {
      year: "",
      size: "",
      category: "",
      description: "",
      country: "",
      city: "",
      cardUrl: "",
      cardAlt: "",
      urlPamorama: "",
      altPamorama: "",
      urlBefore: "",
      altBefore: "",
      desBefore: "",
      urlSketch: "",
      altSketch: "",
      desSketch: "",
      urlImaging: "",
      altImaging: "",
      desImaging: "",
      urlConstraction: "",
      altConstraction: "",
      desConstraction: "",
      urlGallery: "",
      altGallery: "",
    },
    errors: {},
    images: [],
  };

  schema = {
    // name - אני מרכיב אחר כך מהשנה והכתובת
    year: Joi.string().required().min(2).max(4).label("year"),
    size: Joi.string().required().min(2).max(255).label("size"),
    category: Joi.string().required().min(2).max(255).label("category"),
    description: Joi.string().required().min(2).max(1024).label("description"),
    country: Joi.string().required().min(2).max(255).label("country"),
    city: Joi.string().required().min(2).max(255).label("city"),
    cardUrl: Joi.string().required().min(2).max(255),
    cardAlt: Joi.string().required().min(2).max(255),
    urlPamorama: Joi.string().required().min(2).max(255).label("urlPamorama"),
    altPamorama: Joi.string().required().min(2).max(255).label("altPamorama"),
    urlBefore: Joi.string().min(2).max(255).label("urlBefore"),
    altBefore: Joi.string().min(2).max(255).label("altBefore"),
    desBefore: Joi.string().min(2).max(1024).label("desBefore"),
    urlSketch: Joi.string().min(2).max(255).label("urlSketch"),
    altSketch: Joi.string().min(2).max(255).label("altSketch"),
    desSketch: Joi.string().min(2).max(1024).label("desSketch"),
    urlImaging: Joi.string().min(2).max(255).label("urlImaging"),
    altImaging: Joi.string().min(2).max(255).label("altImaging"),
    desImaging: Joi.string().min(2).max(1024).label("desImaging"),
    urlConstraction: Joi.string().min(2).max(255).label("urlConstraction"),
    altConstraction: Joi.string().min(2).max(255).label("altConstraction"),
    desConstraction: Joi.string().min(2).max(1024).label("desConstraction"),
    urlGallery: Joi.string().min(2).max(1024).label("urlGallery"),
    altGallery: Joi.string().min(2).max(255).label("altGallery"),
  };

  checkName = name => name.replace(/\s/g, "-");

  upload = () => {
    const {
      name,
      year,
      size,
      category,
      description,
      country,
      city,
      cardUrl,
      cardAlt,
      urlPamorama,
      altPamorama,
      urlBefore,
      altBefore,
      desBefore,
      urlSketch,
      altSketch,
      desSketch,
      urlImaging,
      altImaging,
      desImaging,
      urlConstraction,
      altConstraction,
      desConstraction,
      urlGallery,
      altGallery,
    } = this.state.data;
    const { images } = this.state;
    const nameChecked = this.checkName(name.trim());

    const formData = new FormData();
    formData.append("name", nameChecked);
    formData.append("year", year.trim());
    formData.append("size", size.trim());
    formData.append("category", category.trim());
    formData.append("description", description.trim());
    formData.append("country", country.trim());
    formData.append("city", city.trim());
    formData.append("cardUrl", cardUrl);
    formData.append("cardAlt", cardAlt.trim());
    formData.append("urlPamorama", urlPamorama.trim());
    formData.append("altPamorama", altPamorama.trim());
    formData.append("urlBefore", urlBefore.trim());
    formData.append("altBefore", altBefore.trim());
    formData.append("desBefore", desBefore.trim());
    formData.append("urlSketch", urlSketch.trim());
    formData.append("altSketch", altSketch.trim());
    formData.append("desSketch", desSketch.trim());
    formData.append("urlImaging", urlImaging.trim());
    formData.append("altImaging", altImaging.trim());
    formData.append("desImaging", desImaging.trim());
    formData.append("urlConstraction", urlConstraction.trim());
    formData.append("altConstraction", altConstraction.trim());
    formData.append("desConstraction", desConstraction.trim());
    formData.append("urlGallery", urlGallery.trim());
    formData.append("altGallery", altGallery.trim());

    for (let x = 0; x < images.length; x++) {
      for (let i of images[x]) {
        formData.append("images", i);
      }
    }
    return formData;
  };

  doSubmit = async () => {
    const formData = this.upload();
    try {
      await createProject(formData);
      toast("הפרויקט נוצר");
      this.props.history.replace("/private-area/projects-search-page");
    } catch (err) {
      toast("ארעה שגיאה - הפרויקט לא נשמר");
      this.setState({
        errors: { title: "קרתה שגיאה בשמירת הפרויקט - הפרויקט לא נשמר" },
      });
    }
  };

  render() {
    return (
      <div className="create-project">
        <Titles
          titleBold="צור"
          title="פרויקט חדש"
          subTitle="כאן תוכל ליצור פרויקט חדש, את השדות שמסומנים בכוכבית חובה למלא"
        />

        <div className="container">
          <div className="center">
            <form
              className="col-10 bg-light rounded mb-4 pt-2"
              onSubmit={this.handleSubmit}
              autoComplete="off"
              method="POST">
              <h3 className="h3Title text-right">פרטים ראשוניים על הפרויקט</h3>
              <div className="d-flex justify-content-between">
                {this.renderInput(
                  "country",
                  "ארץ *",
                  false,
                  "text",
                  "col-2 mb-2 px-0"
                )}
                {this.renderInput(
                  "city",
                  "עיר *",
                  false,
                  "text",
                  "col-2 mb-2 px-2"
                )}
                {this.renderInput(
                  "houseNumber",
                  "מספר בית *",
                  false,
                  "text",
                  "col-2 mb-2 px-2"
                )}
                {this.renderInput(
                  "street",
                  "רחוב *",
                  false,
                  "text",
                  "col-6 mb-2 px-0"
                )}
              </div>

              <div className="d-flex justify-content-between">
                {this.renderInput(
                  "year",
                  " שנה *",
                  false,
                  "number",
                  "col-2 mb-2 pl-0"
                )}
                {this.renderInput(
                  "size",
                  "גודל הנכס במטרים *",
                  false,
                  "number",
                  "col-3 mb-2 px-0"
                )}
                {this.renderSelectBox(
                  "category",
                  "בחר קטגוריה *",
                  [
                    { text: "דירה", value: "apartment" },
                    { text: "וילה", value: "villa" },
                    { text: "בניין מגורים", value: "Building" },
                    { text: "קומפלקס דירות", value: "apartment-complex" },
                    { text: "מלון", value: "hotel" },
                  ],
                  "col-2 mb-2 px-2"
                )}
                {this.renderInput(
                  "zip",
                  "מיקוד",
                  false,
                  "text",
                  "col-2 mb-2 px-0"
                )}
              </div>
              {this.renderTextarea("description", "תיאור הנכס")}
              <hr />

              <h3 className="h3Title text-right">חוזים</h3>
              {this.renderFileInput("contracts", "העלה קובץ של החוזה")}
              <hr />

              <h3 className="h3Title text-right">רישוי</h3>
              {this.renderFileInput(
                "contracts",
                "העלה קבצים הקשורים לרישוי הפרויקט"
              )}
              <hr />

              <h3 className="h3Title text-right">מומחים ויועצים</h3>
              <div className="d-flex justify-content-between">
                {this.renderFileInput(
                  "expertFile",
                  "העלה קובץ",
                  false,
                  "text",
                  "col-2 mb-2 px-0"
                )}
                {this.renderInput(
                  "phone",
                  "טלפון",
                  false,
                  "text",
                  "col-4 mb-2 px-2"
                )}
                {this.renderInput(
                  "lastName",
                  "שם משפחה",
                  false,
                  "text",
                  "col-4 mb-2 px-2"
                )}
                {this.renderInput(
                  "firstName",
                  "שם פרטי",
                  false,
                  "text",
                  "col-2 mb-2 px-0"
                )}
              </div>
              <hr />

              <h3 className="h3Title text-right">תמונות</h3>
              <div className="d-flex justify-content-between">
                {this.renderFileInput(
                  "cardUrl",
                  "העלה תמונה לכרטיס הפרוייקט",
                  false,
                  "text",
                  "col-4 mb-2 pr-1 pl-0"
                )}
                {this.renderInput(
                  "cardAlt",
                  "תיאור התמונה לכרטיס הפרוייקט",
                  false,
                  "text",
                  "col-8 mb-2  pr-0 pl-1"
                )}
              </div>

              <div className="d-flex justify-content-between">
                {this.renderFileInput(
                  "urlPamorama",
                  "העלה תמונה של הנכס מבחוץ",
                  false,
                  "text",
                  "col-4 mb-2 pr-1 pl-0"
                )}
                {this.renderInput(
                  "altPamorama",
                  "תיאור התמונה לצורך נגישות",
                  false,
                  "text",
                  "col-8 mb-2  pr-0 pl-1"
                )}
              </div>

              <div className="d-flex justify-content-between">
                {this.renderFileInput(
                  "urlBefore",
                  "העלה התמונה לפני הבניה/ השיפוץ",
                  false,
                  "text",
                  "col-4 mb-2 pr-1 pl-0"
                )}
                {this.renderInput(
                  "altBefore",
                  "תיאור התמונה לצורך נגישות",
                  false,
                  "text",
                  "col-8 mb-2  pr-0 pl-1"
                )}
              </div>
              {this.renderTextarea(
                "desBefore",
                "תיאור מצב הנכס לפני תהליך הבניה/ השיפוץ"
              )}

              <div className="d-flex justify-content-between">
                {this.renderFileInput(
                  "urlConstraction",
                  "העלה תמונה מהשיפוצים/ הבנייה",
                  false,
                  "text",
                  "col-4 mb-2 pr-1 pl-0"
                )}
                {this.renderInput(
                  "altConstraction",
                  "תיאור התמונה לצורך נגישות",
                  false,
                  "text",
                  "col-8 mb-2  pr-0 pl-1"
                )}
              </div>
              {this.renderTextarea(
                "desConstraction",
                "תיאור תהליך הבנייה / השיפוץ"
              )}

              {this.renderFileInput(
                "urlGallery",
                "העלה תמונות של הפרויקט גמור"
              )}
              <hr />

              <h3 className="h3Title text-right">תוכניות הדמיות וסקיצות</h3>

              <div className="d-flex justify-content-between">
                {this.renderFileInput(
                  "urlSketch",
                  "העלה סקיצה",
                  false,
                  "text",
                  "col-4 mb-2 pr-1 pl-0"
                )}
                {this.renderInput(
                  "altSketch",
                  "תיאור סקיצה לצורך נגישות",
                  false,
                  "text",
                  "col-8 mb-2  pr-0 pl-1"
                )}
              </div>
              {this.renderTextarea("desSketch", "תיאור תהליך העבודה על הסקיצה")}

              <div className="d-flex justify-content-between">
                {this.renderFileInput(
                  "urlImaging",
                  "העלה הדמייה",
                  false,
                  "text",
                  "col-4 mb-2 pr-1 pl-0"
                )}
                {this.renderInput(
                  "altImaging",
                  "תיאור הדמייה לצורך נגישות",
                  false,
                  "text",
                  "col-8 mb-2  pr-0 pl-1"
                )}
              </div>
              {this.renderTextarea(
                "desImaging",
                "תיאור תהליך העבודה על הדמייה"
              )}

              <div className="d-flex justify-content-between">
                {this.renderFileInput(
                  "urlPlans",
                  "העלה תוכנית ארכיטקטית ",
                  false,
                  "text",
                  "col-4 mb-2 pr-1 pl-0"
                )}
                {this.renderInput(
                  "altPlans",
                  "תיאור תוכנית ארכיטקטית לצורך נגישות",
                  false,
                  "text",
                  "col-8 mb-2  pr-0 pl-1"
                )}
              </div>

              {this.renderButton(
                "צור פרויקט",
                "btn btn-lg btn-outline-dark btn-block my-3"
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateProject;
// import React from 'react';
// import Titles from '../../common/titles';
// import Joi from "joi-browser";
// import Form from '../../common/form';
// import { createProject } from '../../../services/projectService';
// import { toast } from 'react-toastify';

// class CreateProject extends Form {
//     state = {
//         data: {
//             name:'', year: '', size:'', category:'', description:'', country:'',
//             city:'', cardUrl:'', cardAlt: '', urlPamorama:'', altPamorama:'',
//             urlBefore:'', altBefore:'', desBefore:'', urlSketch:'', altSketch:'',
//             desSketch:'', urlImaging:'', altImaging:'', desImaging:'', urlConstraction:'',
//             altConstraction:'', desConstraction:'', urlGallery:'', altGallery:''
//          },
//         errors: {},
//         images: []
//      }

//      schema = {
//         name: Joi.string().required().min(2).max(255).label('name'),
//         year: Joi.string().required().min(2).max(4).label('year'),
//         size: Joi.string().required().min(2).max(255).label('size'),
//         category: Joi.string().required().min(2).max(255).label('category'),
//         description: Joi.string().required().min(2).max(1024).label('description'),
//         country: Joi.string().required().min(2).max(255).label('country'),
//         city: Joi.string().required().min(2).max(255).label('city'),
//         cardUrl: Joi.string().required().min(2).max(255),
//         cardAlt: Joi.string().required().min(2).max(255),
//         urlPamorama: Joi.string().required().min(2).max(255).label('urlPamorama'),
//         altPamorama: Joi.string().required().min(2).max(255).label('altPamorama'),
//         urlBefore: Joi.string().min(2).max(255).label('urlBefore'),
//         altBefore: Joi.string().min(2).max(255).label('altBefore'),
//         desBefore: Joi.string().min(2).max(1024).label('desBefore'),
//         urlSketch: Joi.string().min(2).max(255).label('urlSketch'),
//         altSketch: Joi.string().min(2).max(255).label('altSketch'),
//         desSketch: Joi.string().min(2).max(1024).label('desSketch'),
//         urlImaging: Joi.string().min(2).max(255).label('urlImaging'),
//         altImaging: Joi.string().min(2).max(255).label('altImaging'),
//         desImaging: Joi.string().min(2).max(1024).label('desImaging'),
//         urlConstraction: Joi.string().min(2).max(255).label('urlConstraction'),
//         altConstraction: Joi.string().min(2).max(255).label('altConstraction'),
//         desConstraction: Joi.string().min(2).max(1024).label('desConstraction'),
//         urlGallery: Joi.string().min(2).max(1024).label('urlGallery'),
//         altGallery: Joi.string().min(2).max(255).label('altGallery'),
//      }

//      checkName = name => name.replace(/\s/g, "-")

//      upload = () => {
//         const {name, year, size,category,description,country,city, cardUrl, cardAlt,urlPamorama, altPamorama, urlBefore, altBefore, desBefore, urlSketch, altSketch, desSketch, urlImaging, altImaging, desImaging, urlConstraction, altConstraction, desConstraction, urlGallery, altGallery} = this.state.data;
//         const {images} = this.state;
//         const nameChecked = this.checkName(name.trim());

//         const formData = new FormData();
//         formData.append("name", nameChecked);
//         formData.append("year", year.trim());
//         formData.append("size", size.trim());
//         formData.append("category", category.trim());
//         formData.append("description", description.trim());
//         formData.append("country", country.trim());
//         formData.append("city", city.trim());
//         formData.append("cardUrl", cardUrl);
//         formData.append("cardAlt", cardAlt.trim());
//         formData.append("urlPamorama", urlPamorama.trim());
//         formData.append("altPamorama", altPamorama.trim());
//         formData.append("urlBefore", urlBefore.trim());
//         formData.append("altBefore", altBefore.trim());
//         formData.append("desBefore", desBefore.trim());
//         formData.append("urlSketch", urlSketch.trim());
//         formData.append("altSketch", altSketch.trim());
//         formData.append("desSketch", desSketch.trim());
//         formData.append("urlImaging", urlImaging.trim());
//         formData.append("altImaging", altImaging.trim());
//         formData.append("desImaging", desImaging.trim());
//         formData.append("urlConstraction", urlConstraction.trim());
//         formData.append("altConstraction", altConstraction.trim());
//         formData.append("desConstraction", desConstraction.trim());
//         formData.append("urlGallery", urlGallery.trim());
//         formData.append("altGallery", altGallery.trim());

//         for(let x = 0; x < images.length; x++){
//             for (let i of images[x]) {
//                 formData.append("images", i);
//             }
//         }
//         return formData
//       }

//       doSubmit = async ()=>{
//         const formData = this.upload()
//          try{
//             await createProject(formData);
//             toast('הפרויקט נוצר');
//             this.props.history.replace('/private-area/projects-search-page');
//          }catch(err){
//              toast('ארעה שגיאה - הפרויקט לא נשמר')
//              this.setState({ errors: { title: 'קרתה שגיאה בשמירת הפרויקט - הפרויקט לא נשמר' }});
//          }
//      };

//     render() {
//         return (
//                 <div className="create-project">

//                     <Titles titleBold='צור'
//                             title= 'פרויקט חדש'
//                             subTitle='כאן תוכל ליצור פרויקט חדש, את השדות שמסומנים בכוכבית חובה למלא' />

//                     <div className="container">
//                         <div className="center">
//                             <form className='col-10 bg-light rounded mb-4 pt-2'
//                              onSubmit={ this.handleSubmit }
//                              autoComplete='off'
//                              method='POST'>

//                                 { this.renderInput('name', 'שם הפרויקט *' ) }
//                                 { this.renderInput('year', ' השנה בה הסתיים הפרויקט *', false, 'number' ) }
//                                 { this.renderInput('size', 'גודל הנכס במטר רבוע *', false, 'number') }
//                                 { this.renderSelectBox('category', 'בחר קטגוריה', [
//                                     {text:'דירה', value:'apartment' },
//                                     {text:'וילה', value:'villa' },
//                                     {text:'בניין מגורים', value:'Building' },
//                                     {text:'קומפלקס דירות', value:'apartment-complex' },
//                                     {text:'מלון', value:'hotel' }
//                                     ]) }
//                                 { this.renderTextarea('description', 'תיאור הנכס *' ) }
//                                 { this.renderInput('country', 'הארץ בה מצוי הנכס  *' ) }
//                                 { this.renderInput('city', 'העיר בה מצוי הנכס  *' ) }
//                                 { this.renderFileInput('cardUrl', 'העלה תמונה לכרטיס הפרוייקט *' ) }
//                                 { this.renderInput('cardAlt', 'תיאור התמונה לכרטיס הפרוייקט *' ) }
//                                 { this.renderFileInput('urlPamorama', 'העלה תמונה של הנכס מבחוץ *' ) }
//                                 { this.renderInput('altPamorama', 'תיאור של התמונה לצורך נגישות *' ) }
//                                 { this.renderFileInput('urlBefore', 'העלה התמונה של הנכס לפני הבניה/ השיפוץ' ) }
//                                 { this.renderInput('altBefore', 'תיאור של התמונה לצורך נגישות' ) }
//                                 { this.renderTextarea('desBefore', 'תיאור מצב הנכס לפני תהליך הבניה/ השיפוץ' ) }
//                                 { this.renderFileInput('urlSketch', 'העלה סקיצה של הפרויקט' ) }
//                                 { this.renderInput('altSketch', 'תיאור של הסקיצה לצורך נגישות' ) }
//                                 { this.renderTextarea('desSketch', 'תיאור תהליך העבודה על הסקיצה' ) }
//                                 { this.renderFileInput('urlImaging', 'העלה הדמייה של הפרויקט' ) }
//                                 { this.renderInput('altImaging', 'תיאור של ההדמייה לצורך נגישות' ) }
//                                 { this.renderTextarea('desImaging', 'תיאור תהליך העבודה על ההדמייה' ) }
//                                 { this.renderFileInput('urlConstraction', 'העלה תמונה מהשיפוצים / הבנייה של הפרויקט' ) }
//                                 { this.renderInput('altConstraction', 'תיאור של התמונה לצורך נגישות' ) }
//                                 { this.renderTextarea('desConstraction', 'תיאור תהליך הבנייה / השיפוץ' ) }
//                                 { this.renderFileInput('urlGallery', 'העלה תמונות לגלריית התמונות' ) }
//                                 { this.renderInput('altGallery', 'תיאור של התמונה לצורך נגישות' ) }
//                                 { this.renderButton('צור פרויקט', 'btn btn-lg btn-outline-dark btn-block my-3') }
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//          );
//     }
// }

// export default CreateProject;
