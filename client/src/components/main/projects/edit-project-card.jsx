import React from "react";
import Joi from "joi-browser";
import Titles from "../../common/titles";
import Form from "../../common/form";
import {
  getProject,
  editProject,
  editprojectWithPics,
  changePublishStatus,
} from "../../../services/projectService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

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
      cardAlt: "",
      altPamorama: "",
      altBefore: "",
      desBefore: "",
      altConstraction: "",
      desConstraction: "",
      altSketch: "",
      desSketch: "",
      altImaging: "",
      desImaging: "",
      altPlans: "",
      isPublished: "",
    },
    errors: {},
    images: [],
  };

  async componentDidMount() {
    const projectId = this.props.match.params.id;
    const { data } = await getProject(projectId);
    this.setState({ data: this.mapToNewModel(data) });
  }

  mapToNewModel(project) {
    return {
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
      isPublished: project.isPublished,
    };
  }

  schema = {
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
    isPublished: Joi.boolean(),
  };

  checkName = name => name.replace(/\s/g, "-");
  checkSpaces = text => text.replace(/\s/g, "-");

  upload = () => {
    const {
      name,
      country,
      city,
      houseNumber,
      street,
      zip,
      year,
      size,
      category,
      description,
      cardUrl,
      cardAlt,
      urlPamorama,
      altPamorama,
      urlBefore,
      altBefore,
      desBefore,
      urlConstraction,
      altConstraction,
      desConstraction,
      urlGallery,
      urlSketch,
      altSketch,
      desSketch,
      urlImaging,
      altImaging,
      desImaging,
      urlPlans,
      altPlans,
    } = this.state.data;
    const projectId = this.props.match.params.id;
    const { images } = this.state;
    const nameChecked = this.checkName(name.trim());

    const checkInput = (text, input) =>
      input ? formData.append(text, input.trim()) : null;

    const formData = new FormData();
    formData.append("id", projectId);
    formData.append("name", nameChecked);
    formData.append("country", this.checkSpaces(country.trim()));
    formData.append("city", this.checkSpaces(city.trim()));
    formData.append("houseNumber", houseNumber.trim());
    formData.append("street", street.trim());
    formData.append("year", year.trim());
    formData.append("size", size.trim());
    formData.append("category", category.trim());
    formData.append("zip", zip);
    formData.append("description", description);
    checkInput("cardUrl", cardUrl);
    formData.append("cardAlt", cardAlt);
    checkInput("urlPamorama", urlPamorama);
    formData.append("altPamorama", altPamorama);
    checkInput("urlBefore", urlBefore);
    formData.append("altBefore", altBefore);
    formData.append("desBefore", desBefore);
    checkInput("urlConstraction", urlConstraction);
    formData.append("altConstraction", altConstraction);
    formData.append("desConstraction", desConstraction);
    checkInput("urlSketch", urlSketch);
    formData.append("altSketch", altSketch);
    formData.append("desSketch", desSketch);
    checkInput("urlImaging", urlImaging);
    formData.append("altImaging", altImaging);
    formData.append("desImaging", desImaging);
    checkInput("urlPlans", urlPlans);
    formData.append("altPlans", altPlans);
    checkInput("urlGallery", urlGallery);

    for (let x = 0; x < images.length; x++) {
      for (let i of images[x]) {
        formData.append("images", i);
      }
    }
    return formData;
  };

  doSubmit = async () => {
    // const dataFromState = { ...this.state.data };
    // const projectId = this.props.match.params.id;
    // const { data } = await getProject(projectId);

    // const {
    //   cardUrl,
    //   urlPamorama,
    //   urlBefore,
    //   urlSketch,
    //   urlImaging,
    //   urlConstraction,
    //   urlGallery,
    //   urlPlans,
    // } = dataFromState;

    try {
      // if (
      //   cardUrl === undefined &&
      //   urlPamorama === undefined &&
      //   urlBefore === undefined &&
      //   urlSketch === undefined &&
      //   urlImaging === undefined &&
      //   urlConstraction === undefined &&
      //   urlGallery === undefined &&
      //   urlPlans === undefined
      // ) {
      //   dataFromState.cardUrl = data.cardUrl;
      //   dataFromState.urlPamorama = data.urlPamorama;
      //   dataFromState.urlBefore = data.urlBefore;
      //   dataFromState.urlSketch = data.urlSketch;
      //   dataFromState.urlImaging = data.urlImaging;
      //   dataFromState.urlConstraction = data.urlConstraction;
      //   dataFromState.urlGallery = data.urlGallery;
      //   dataFromState.urlPlans = data.urlPlans;
      //   await editProject(dataFromState);
      //   toast("הפרויקט עודכן בהצלחה!");
      //   return this.props.history.replace("/private-area/projects-search-page");
      // }

      const formData = this.upload();
      // const formData = this.upload(data);
      await editProject(formData);
      toast("הפרויקט עודכן בהצלחה!");
      return this.props.history.replace("/private-area/projects-search-page");
    } catch (err) {
      console.log(err.message);
    }
  };

  publish = async (projectId, e) => {
    e.preventDefault();
    Swal.fire({
      title: "?האם אתה בטוח",
      text: "כל מי שיכנס לאתר יוכל לראות את פרטי הפרויקט",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "כן, אני רוצה לפרסם!",
      cancelButtonText: "בטל",
    }).then(result => {
      if (result.isConfirmed) {
        let project = this.state.data;
        let status = project.isPublished;
        let changeStatus = !status;
        toast("ההרשאה עודכנה");
        this.setState({ data: (project.isPublished = changeStatus) });
        return changePublishStatus(projectId);
      }
    });
  };

  render() {
    const project = this.state.data;

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
                  ".png, .jpg, .jpeg",
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
                  ".png, .jpg, .jpeg",
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
                  ".png, .jpg, .jpeg",
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
                  ".png, .jpg, .jpeg",
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
                  ".png, .jpg, .jpeg",
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
                  ".png, .jpg, .jpeg",
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
                  ".png, .jpg, .jpeg",
                  "col-4 mb-2 pr-1 pl-0"
                )}
              </div>

              {this.renderButton(
                "עדכן פרויקט",
                "btn btn-lg btn-outline-dark btn-block my-3"
              )}
              {project.isPublished !== true && (
                <button
                  className="btn btn-lg btn-danger btn-block my-3 border border-dark"
                  onClick={e => this.publish(this.props.match.params.id, e)}
                  disabled={this.validate()}>
                  פרסם
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditProject;
