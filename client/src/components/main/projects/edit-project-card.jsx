import React from "react";
import Joi from "joi-browser";
import Titles from "../../common/titles";
import Form from "../../common/form";
import {
  getProject,
  editProject,
  editprojectWithPics,
} from "../../../services/projectService";
import { toast } from "react-toastify";

class EditProject extends Form {
  state = {
    data: {
      name: "",
      country: "",
      city: "",
      houseNumber: "",
      street: "",
      zip: "",
      year: "",
      size: "",
      category: "",
      description: "",
      contract: "",
      licensing: "",
      expertFile: "",
      expertPhone: "",
      expertLastName: "",
      expertFirstName: "",
      cardUrl: "",
      cardAlt: "",
      urlPamorama: "",
      altPamorama: "",
      urlBefore: "",
      altBefore: "",
      desBefore: "",
      urlConstraction: "",
      altConstraction: "",
      desConstraction: "",
      urlGallery: "",
      urlSketch: "",
      altSketch: "",
      desSketch: "",
      urlImaging: "",
      altImaging: "",
      desImaging: "",
      urlPlans: "",
      altPlans: "",
      referenceUrl: "",
      referenceAlt: "",
    },
    errors: {},
    images: [],
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().required().min(2).max(255).label("name"),
    country: Joi.string().required().min(2).max(255).label("country"),
    city: Joi.string().required().min(2).max(255).label("city"),
    houseNumber: Joi.string().required().min(1).max(255).label("houseNumber"),
    street: Joi.string().required().min(2).max(255).label("street"),
    zip: Joi.string().min(4).max(255).label("zip"),
    year: Joi.string().required().min(4).max(4).label("year"),
    size: Joi.string().required().min(1).max(255).label("size"),
    category: Joi.string().required().min(2).max(255).label("category"),
    description: Joi.string().min(2).max(1024).label("description"),
    contract: Joi.string().min(2).max(255).label("contract"),
    licensing: Joi.string().min(2).max(255).label("licensing"),
    expertFile: Joi.string().min(2).max(255).label("expertFile"),
    expertPhone: Joi.string().min(8).max(14).label("expertPhone"),
    expertLastName: Joi.string().min(2).max(256).label("expertLastName"),
    expertFirstName: Joi.string().min(2).max(256).label("expertFirstName"),
    cardUrl: Joi.string().min(2).max(255).label("cardUrl"),
    cardAlt: Joi.string().min(2).max(255).label("cardAlt"),
    urlPamorama: Joi.string().min(2).max(255).label("urlPamorama"),
    altPamorama: Joi.string().min(2).max(255).label("altPamorama"),
    urlBefore: Joi.string().min(2).max(255).label("urlBefore"),
    altBefore: Joi.string().min(2).max(255).label("altBefore"),
    desBefore: Joi.string().min(2).max(1024).label("desBefore"),
    urlConstraction: Joi.string().min(2).max(255).label("urlConstraction"),
    altConstraction: Joi.string().min(2).max(255).label("altConstraction"),
    desConstraction: Joi.string().min(2).max(1024).label("desConstraction"),
    urlGallery: Joi.string().min(2).max(1024).label("urlGallery"),
    urlSketch: Joi.string().min(2).max(255).label("urlSketch"),
    altSketch: Joi.string().min(2).max(255).label("altSketch"),
    desSketch: Joi.string().min(2).max(1024).label("desSketch"),
    urlImaging: Joi.string().min(2).max(255).label("urlImaging"),
    altImaging: Joi.string().min(2).max(255).label("altImaging"),
    desImaging: Joi.string().min(2).max(1024).label("desImaging"),
    urlPlans: Joi.string().min(2).max(1024).label("urlPlans"),
    altPlans: Joi.string().min(2).max(1024).label("altPlans"),
    referenceUrl: Joi.string().min(2).max(1024).label("referenceUrl"),
    referenceAlt: Joi.string().min(2).max(1024).label("referenceAlt"),
  };

  async componentDidMount() {
    const projectId = this.props.match.params.id;
    const { data } = await getProject(projectId);
    this.setState({ data: this.mapToNewModel(data) });
  }

  mapToNewModel(project) {
    return {
      _id: project._id,
      name: project.name,
      country: project.address.country,
      city: project.address.city,
      houseNumber: project.address.houseNumber,
      street: project.address.street,
      zip: project.address.zip,
      year: project.year,
      size: project.size,
      category: project.category,
      description: project.description,
      cardAlt: project.images.card.alt,
      altPamorama: project.images.panorama.alt,
      altBefore: project.images.before[0].alt,
      desBefore: project.images.before[0].description,
      altConstraction: project.images.constraction[0].alt,
      desConstraction: project.images.constraction[0].description,
      altSketch: project.images.sketches[0].alt,
      desSketch: project.images.sketches[0].description,
      altImaging: project.images.imaging[0].alt,
      desImaging: project.images.imaging[0].description,
      altPlans: project.images.plans[0].alt,
      referenceAlt: project.images.references[0].alt,
    };
  }

  checkName = name => name.replace(/\s/g, "-");

  upload = data => {
    const projectId = this.props.match.params.id;
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
    formData.append("cardAlt", cardAlt.trim());
    formData.append("altPamorama", altPamorama.trim());
    formData.append("altBefore", altBefore.trim());
    formData.append("desBefore", desBefore.trim());
    formData.append("altSketch", altSketch.trim());
    formData.append("desSketch", desSketch.trim());
    formData.append("altImaging", altImaging.trim());
    formData.append("desImaging", desImaging.trim());
    formData.append("altConstraction", altConstraction.trim());
    formData.append("desConstraction", desConstraction.trim());
    formData.append("altGallery", altGallery.trim());
    formData.append("id", projectId);

    if (cardUrl === undefined) formData.append("cardUrl", data.cardUrl);
    else formData.append("cardUrl", cardUrl.trim());
    if (urlPamorama === undefined)
      formData.append("urlPamorama", data.urlPamorama);
    else formData.append("urlPamorama", urlPamorama.trim());
    if (urlBefore === undefined) formData.append("urlBefore", data.urlBefore);
    else formData.append("urlBefore", urlBefore.trim());
    if (urlSketch === undefined) formData.append("urlSketch", data.urlSketch);
    else formData.append("urlSketch", urlSketch.trim());
    if (urlImaging === undefined)
      formData.append("urlImaging", data.urlImaging);
    else formData.append("urlImaging", urlImaging.trim());
    if (urlConstraction === undefined)
      formData.append("urlConstraction", data.urlConstraction);
    else formData.append("urlConstraction", urlConstraction.trim());
    if (urlGallery === undefined)
      formData.append("urlGallery", data.urlGallery);
    else formData.append("urlGallery", urlGallery.trim());

    for (let x = 0; x < images.length; x++) {
      for (let i of images[x]) {
        formData.append("images", i);
      }
    }
    return formData;
  };

  doSubmit = async () => {
    const dataFromState = { ...this.state.data };
    const projectId = this.props.match.params.id;
    const { data } = await getProject(projectId);
    const {
      cardUrl,
      urlPamorama,
      urlBefore,
      urlSketch,
      urlImaging,
      urlConstraction,
      urlGallery,
    } = dataFromState;

    try {
      if (
        cardUrl === undefined &&
        urlPamorama === undefined &&
        urlBefore === undefined &&
        urlSketch === undefined &&
        urlImaging === undefined &&
        urlConstraction === undefined &&
        urlGallery === undefined
      ) {
        dataFromState.cardUrl = data.cardUrl;
        dataFromState.urlPamorama = data.urlPamorama;
        dataFromState.urlBefore = data.urlBefore;
        dataFromState.urlSketch = data.urlSketch;
        dataFromState.urlImaging = data.urlImaging;
        dataFromState.urlConstraction = data.urlConstraction;
        dataFromState.urlGallery = data.urlGallery;
        await editProject(dataFromState);
        toast("הפרויקט עודכן בהצלחה!");
        return this.props.history.replace("/private-area/projects-search-page");
      }

      const formData = this.upload(data);
      await editprojectWithPics(formData);
      toast("הפרויקט עודכן בהצלחה!");
      return this.props.history.replace("/private-area/projects-search-page");
    } catch (err) {
      console.log(err.message);
    }
  };

  render() {
    return (
      <div className="edit-project">
        <Titles
          titleBold="ערוך"
          title="את הפרויקט"
          subTitle="כאן תוכל לערוך את הפרויקט"
          BoldColor="white"
          subColor="white"
        />

        <div className="container">
          <div className="center">
            <form
              className="col-10 bg-light rounded mb-4 pt-2"
              onSubmit={this.handleSubmit}
              autoComplete="off"
              method="POST">
              <h3 className="h3Title text-right">פרטים ראשוניים על הפרויקט</h3>
              <div className="d-flex flex-row-reverse">
                {this.renderInput(
                  "street",
                  "רחוב *",
                  true,
                  "text",
                  "col-6 mb-2 px-0"
                )}
                {this.renderInput(
                  "houseNumber",
                  "מספר בית *",
                  true,
                  "number",
                  "col-2 mb-2 px-2"
                )}
                {this.renderInput(
                  "city",
                  "עיר *",
                  true,
                  "text",
                  "col-2 mb-2 px-2"
                )}
                {this.renderInput(
                  "country",
                  "ארץ *",
                  true,
                  "text",
                  "col-2 mb-2 px-0"
                )}
              </div>

              <div className="d-flex flex-row-reverse">
                {this.renderInput(
                  "year",
                  " שנה *",
                  true,
                  "number",
                  "col-2 mb-2 pr-0"
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
                  "col-4 mb-2 px-2"
                )}
                {this.renderInput(
                  "zip",
                  "מיקוד",
                  false,
                  "number",
                  "col-3 mb-2 pl-0"
                )}
              </div>
              {this.renderTextarea("description", "תיאור הנכס")}
              <hr />

              <h3 className="h3Title text-right">תמונות</h3>
              <div className="d-flex flex-row-reverse">
                {this.renderInput(
                  "cardAlt",
                  "תיאור התמונה לכרטיס הפרוייקט",
                  false,
                  "text",
                  "col-8 mb-2  pr-0 pl-1"
                )}
                {this.renderFileInput(
                  "cardUrl",
                  "העלה תמונה לכרטיס הפרוייקט",
                  false,
                  "text",
                  "col-4 mb-2 pr-1 pl-0"
                )}
              </div>

              <div className="d-flex flex-row-reverse">
                {this.renderInput(
                  "altPamorama",
                  "תיאור התמונה לצורך נגישות",
                  false,
                  "text",
                  "col-8 mb-2  pr-0 pl-1"
                )}
                {this.renderFileInput(
                  "urlPamorama",
                  "העלה תמונה של הנכס מבחוץ",
                  false,
                  "text",
                  "col-4 mb-2 pr-1 pl-0"
                )}
              </div>

              <div className="d-flex flex-row-reverse">
                {this.renderInput(
                  "altBefore",
                  "תיאור התמונה לצורך נגישות",
                  false,
                  "text",
                  "col-8 mb-2  pr-0 pl-1"
                )}
                {this.renderFileInput(
                  "urlBefore",
                  "העלה התמונה לפני הבניה/ השיפוץ",
                  false,
                  "text",
                  "col-4 mb-2 pr-1 pl-0"
                )}
              </div>
              {this.renderTextarea(
                "desBefore",
                "תיאור מצב הנכס לפני תהליך הבניה/ השיפוץ"
              )}

              <div className="d-flex flex-row-reverse">
                {this.renderInput(
                  "altConstraction",
                  "תיאור התמונה לצורך נגישות",
                  false,
                  "text",
                  "col-8 mb-2  pr-0 pl-1"
                )}
                {this.renderFileInput(
                  "urlConstraction",
                  "העלה תמונה מהשיפוצים/ הבנייה",
                  false,
                  "text",
                  "col-4 mb-2 pr-1 pl-0"
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

              <div className="d-flex flex-row-reverse">
                {this.renderInput(
                  "altSketch",
                  "תיאור סקיצה לצורך נגישות",
                  false,
                  "text",
                  "col-8 mb-2  pr-0 pl-1"
                )}
                {this.renderFileInput(
                  "urlSketch",
                  "העלה סקיצה",
                  false,
                  "text",
                  "col-4 mb-2 pr-1 pl-0"
                )}
              </div>
              {this.renderTextarea("desSketch", "תיאור תהליך העבודה על הסקיצה")}

              <div className="d-flex flex-row-reverse">
                {this.renderInput(
                  "altImaging",
                  "תיאור הדמייה לצורך נגישות",
                  false,
                  "text",
                  "col-8 mb-2  pr-0 pl-1"
                )}
                {this.renderFileInput(
                  "urlImaging",
                  "העלה הדמייה",
                  false,
                  "text",
                  "col-4 mb-2 pr-1 pl-0"
                )}
              </div>
              {this.renderTextarea(
                "desImaging",
                "תיאור תהליך העבודה על הדמייה"
              )}

              <div className="d-flex flex-row-reverse">
                {this.renderInput(
                  "altPlans",
                  "תיאור תוכנית ארכיטקטית לצורך נגישות",
                  false,
                  "text",
                  "col-8 mb-2  pr-0 pl-1"
                )}
                {this.renderFileInput(
                  "urlPlans",
                  "העלה תוכנית ארכיטקטית ",
                  false,
                  "text",
                  "col-4 mb-2 pr-1 pl-0"
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

export default EditProject;
// import React from "react";
// import Joi from "joi-browser";
// import Titles from "../../common/titles";
// import Form from "../../common/form";
// import {
//   getProject,
//   editProject,
//   editprojectWithPics,
// } from "../../../services/projectService";
// import { toast } from "react-toastify";

// class EditProject extends Form {
//   state = {
//     data: {
//       name: "",
//       year: "",
//       size: "",
//       category: "",
//       description: "",
//       country: "",
//       city: "",
//       cardUrl: "",
//       cardAlt: "",
//       //   urlPamorama: "",
//       altPamorama: "",
//       urlBefore: "",
//       altBefore: "",
//       desBefore: "",
//       //   urlSketch: "",
//       altSketch: "",
//       desSketch: "",
//       //   urlImaging: "",
//       altImaging: "",
//       desImaging: "",
//       //   urlConstraction: "",
//       altConstraction: "",
//       desConstraction: "",
//       //   urlGallery: "",
//       altGallery: "",
//     },
//     errors: {},
//     images: [],
//   };

//   schema = {
//     _id: Joi.string(),
//     name: Joi.string().required().min(2).max(255).label("name"),
//     year: Joi.string().required().min(2).max(4).label("year"),
//     size: Joi.string().required().min(2).max(255).label("size"),
//     category: Joi.string().required().min(2).max(255).label("category"),
//     description: Joi.string().required().min(2).max(1024).label("description"),
//     country: Joi.string().required().min(2).max(255).label("country"),
//     city: Joi.string().required().min(2).max(255).label("city"),
//     cardUrl: Joi.string().min(2).max(255),
//     cardAlt: Joi.string().required().min(2).max(255),
//     urlPamorama: Joi.string().min(2).max(255).label("urlPamorama"),
//     altPamorama: Joi.string().required().min(2).max(255).label("altPamorama"),
//     urlBefore: Joi.string().min(2).max(255).label("urlBefore"),
//     altBefore: Joi.string().min(2).max(255).label("altBefore"),
//     desBefore: Joi.string().min(2).max(255).label("desBefore"),
//     urlSketch: Joi.string().min(2).max(255).label("urlSketch"),
//     altSketch: Joi.string().min(2).max(255).label("altSketch"),
//     desSketch: Joi.string().min(2).max(255).label("desSketch"),
//     urlImaging: Joi.string().min(2).max(255).label("urlImaging"),
//     altImaging: Joi.string().min(2).max(255).label("altImaging"),
//     desImaging: Joi.string().min(2).max(255).label("desImaging"),
//     urlConstraction: Joi.string().min(2).max(255).label("urlConstraction"),
//     altConstraction: Joi.string().min(2).max(255).label("altConstraction"),
//     desConstraction: Joi.string().min(2).max(255).label("desConstraction"),
//     urlGallery: Joi.string().min(2).max(255).label("urlGallery"),
//     altGallery: Joi.string().min(2).max(255).label("altGallery"),
//   };

//   async componentDidMount() {
//     const projectId = this.props.match.params.id;
//     const { data } = await getProject(projectId);

//     this.setState({ data: this.mapToNewModel(data) });
//   }

//   mapToNewModel(project) {
//     return {
//       _id: project._id,
//       name: project.name,
//       year: project.year,
//       size: project.size,
//       category: project.category,
//       description: project.description,
//       country: project.country,
//       city: project.city,
//       cardAlt: project.cardAlt,
//       altPamorama: project.altPamorama,
//       altBefore: project.altBefore,
//       desBefore: project.desBefore,
//       altSketch: project.altSketch,
//       desSketch: project.desSketch,
//       altImaging: project.altImaging,
//       desImaging: project.desImaging,
//       altConstraction: project.altConstraction,
//       desConstraction: project.desConstraction,
//       altGallery: project.altGallery,
//     };
//   }

//   checkName = name => name.replace(/\s/g, "-");

//   upload = data => {
//     const projectId = this.props.match.params.id;
//     const {
//       name,
//       year,
//       size,
//       category,
//       description,
//       country,
//       city,
//       cardUrl,
//       cardAlt,
//       urlPamorama,
//       altPamorama,
//       urlBefore,
//       altBefore,
//       desBefore,
//       urlSketch,
//       altSketch,
//       desSketch,
//       urlImaging,
//       altImaging,
//       desImaging,
//       urlConstraction,
//       altConstraction,
//       desConstraction,
//       urlGallery,
//       altGallery,
//     } = this.state.data;
//     const { images } = this.state;
//     const nameChecked = this.checkName(name.trim());

//     const formData = new FormData();
//     formData.append("name", nameChecked);
//     formData.append("year", year.trim());
//     formData.append("size", size.trim());
//     formData.append("category", category.trim());
//     formData.append("description", description.trim());
//     formData.append("country", country.trim());
//     formData.append("city", city.trim());
//     formData.append("cardAlt", cardAlt.trim());
//     formData.append("altPamorama", altPamorama.trim());
//     formData.append("altBefore", altBefore.trim());
//     formData.append("desBefore", desBefore.trim());
//     formData.append("altSketch", altSketch.trim());
//     formData.append("desSketch", desSketch.trim());
//     formData.append("altImaging", altImaging.trim());
//     formData.append("desImaging", desImaging.trim());
//     formData.append("altConstraction", altConstraction.trim());
//     formData.append("desConstraction", desConstraction.trim());
//     formData.append("altGallery", altGallery.trim());
//     formData.append("id", projectId);

//     if (cardUrl === undefined) formData.append("cardUrl", data.cardUrl);
//     else formData.append("cardUrl", cardUrl.trim());
//     if (urlPamorama === undefined)
//       formData.append("urlPamorama", data.urlPamorama);
//     else formData.append("urlPamorama", urlPamorama.trim());
//     if (urlBefore === undefined) formData.append("urlBefore", data.urlBefore);
//     else formData.append("urlBefore", urlBefore.trim());
//     if (urlSketch === undefined) formData.append("urlSketch", data.urlSketch);
//     else formData.append("urlSketch", urlSketch.trim());
//     if (urlImaging === undefined)
//       formData.append("urlImaging", data.urlImaging);
//     else formData.append("urlImaging", urlImaging.trim());
//     if (urlConstraction === undefined)
//       formData.append("urlConstraction", data.urlConstraction);
//     else formData.append("urlConstraction", urlConstraction.trim());
//     if (urlGallery === undefined)
//       formData.append("urlGallery", data.urlGallery);
//     else formData.append("urlGallery", urlGallery.trim());

//     for (let x = 0; x < images.length; x++) {
//       for (let i of images[x]) {
//         formData.append("images", i);
//       }
//     }
//     return formData;
//   };

//   doSubmit = async () => {
//     const dataFromState = { ...this.state.data };
//     const projectId = this.props.match.params.id;
//     const { data } = await getProject(projectId);
//     const {
//       cardUrl,
//       urlPamorama,
//       urlBefore,
//       urlSketch,
//       urlImaging,
//       urlConstraction,
//       urlGallery,
//     } = dataFromState;

//     try {
//       if (
//         cardUrl === undefined &&
//         urlPamorama === undefined &&
//         urlBefore === undefined &&
//         urlSketch === undefined &&
//         urlImaging === undefined &&
//         urlConstraction === undefined &&
//         urlGallery === undefined
//       ) {
//         dataFromState.cardUrl = data.cardUrl;
//         dataFromState.urlPamorama = data.urlPamorama;
//         dataFromState.urlBefore = data.urlBefore;
//         dataFromState.urlSketch = data.urlSketch;
//         dataFromState.urlImaging = data.urlImaging;
//         dataFromState.urlConstraction = data.urlConstraction;
//         dataFromState.urlGallery = data.urlGallery;
//         await editProject(dataFromState);
//         toast("הפרויקט עודכן בהצלחה!");
//         return this.props.history.replace("/private-area/projects-search-page");
//       }

//       const formData = this.upload(data);
//       await editprojectWithPics(formData);
//       toast("הפרויקט עודכן בהצלחה!");
//       return this.props.history.replace("/private-area/projects-search-page");
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   render() {
//     return (
//       <div className="edit-project">
//         <Titles
//           titleBold="ערוך"
//           title="את הפרויקט"
//           subTitle="כאן תוכל לערוך את הפרויקט"
//           BoldColor="white"
//           subColor="white"
//         />

//         <div className="container">
//           <div className="center">
//             <form
//               className="col-10 bg-light rounded mb-4 pt-2"
//               onSubmit={this.handleSubmit}
//               autoComplete="off"
//               method="POST">
//               {this.renderInput("name", "שם הפרויקט *", true)}
//               {this.renderInput(
//                 "year",
//                 " השנה בה הסתיים הפרויקט *",
//                 true,
//                 "number"
//               )}
//               {this.renderInput(
//                 "size",
//                 "גודל הנכס במטר רבוע *",
//                 false,
//                 "number"
//               )}
//               {this.renderSelectBox("category", "בחר קטגוריה", [
//                 { text: "דירה", value: "apartment" },
//                 { text: "וילה", value: "villa" },
//                 { text: "בניין מגורים", value: "Building" },
//                 { text: "קומפלקס דירות", value: "apartment-complex" },
//                 { text: "מלון", value: "hotel" },
//               ])}
//               {this.renderTextarea("description", "תיאור הנכס *")}
//               {this.renderInput("country", "הארץ בה מצוי הנכס  *")}
//               {this.renderInput("city", "העיר בה מצוי הנכס  *")}
//               {this.renderFileInput("cardUrl", "תמונה לכרטיס הפרוייקט *")}
//               {this.renderInput("cardAlt", "תיאור התמונה לכרטיס הפרוייקט *")}
//               {this.renderFileInput("urlPamorama", "תמונה של הנכס מבחוץ *")}
//               {this.renderInput(
//                 "altPamorama",
//                 "תיאור של התמונה לצורך נגישות *"
//               )}
//               {this.renderFileInput(
//                 "urlBefore",
//                 "התמונה של הנכס לפני הבניה/ השיפוץ"
//               )}
//               {this.renderInput("altBefore", "תיאור של התמונה לצורך נגישות")}
//               {this.renderTextarea(
//                 "desBefore",
//                 "תיאור מצב הנכס לפני תהליך הבניה/ השיפוץ"
//               )}
//               {this.renderFileInput("urlSketch", "סקיצה של הפרויקט")}
//               {this.renderInput("altSketch", "תיאור של הסקיצה לצורך נגישות")}
//               {this.renderTextarea("desSketch", "תיאור תהליך העבודה על הסקיצה")}
//               {this.renderFileInput("urlImaging", "הדמייה של הפרויקט")}
//               {this.renderInput("altImaging", "תיאור של ההדמייה לצורך נגישות")}
//               {this.renderTextarea(
//                 "desImaging",
//                 "תיאור תהליך העבודה על ההדמייה"
//               )}
//               {this.renderFileInput(
//                 "urlConstraction",
//                 "תמונה מהשיפוצים / הבנייה של הפרויקט"
//               )}
//               {this.renderInput(
//                 "altConstraction",
//                 "תיאור של התמונה לצורך נגישות"
//               )}
//               {this.renderTextarea(
//                 "desConstraction",
//                 "תיאור תהליך הבנייה / השיפוץ"
//               )}
//               {this.renderFileInput("urlGallery", "תמונה לגלריית התמונות")}
//               {this.renderInput("altGallery", "תיאור של התמונה לצורך נגישות")}
//               {this.renderButton(
//                 "שלח",
//                 "btn btn-lg btn-outline-dark btn-block my-3"
//               )}
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default EditProject;
