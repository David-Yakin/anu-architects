import React from "react";
import Joi from "joi-browser";
import Titles from "../../common/titles";
import Form from "../../common/form";
import {
  getProject,
  editProject,
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
      altGallery: "",
      isPublished: "",
    },
    errors: {},
    images: [],
    project: "",
  };

  async componentDidMount() {
    const projectId = this.props.match.params.id;
    const { data } = await getProject(projectId);
    this.setState({ data: this.mapToNewModel(data), project: data });
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
      category: project.category.value,
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
      altGallery: project.images.gallery[0].alt,
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
    description: Joi.string().required().min(2).max(1024).label("description"),

    cardUrl: Joi.string().min(2).max(255).label("cardUrl"),
    cardAlt: Joi.string().required().min(2).max(255).label("cardAlt"),

    urlPamorama: Joi.string().min(2).max(255).label("urlPamorama"),
    altPamorama: Joi.string().required().min(2).max(255).label("altPamorama"),

    urlBefore: Joi.string().min(2).max(255).label("urlBefore"),
    altBefore: Joi.string().required().min(2).max(255).label("altBefore"),
    desBefore: Joi.string().required().min(2).max(1024).label("desBefore"),

    urlConstraction: Joi.string().min(2).max(255).label("urlConstraction"),
    altConstraction: Joi.string()
      .required()
      .min(2)
      .max(255)
      .label("altConstraction"),
    desConstraction: Joi.string()
      .required()
      .min(2)
      .max(1024)
      .label("desConstraction"),

    urlGallery: Joi.string().min(2).max(1024).label("urlGallery"),
    altGallery: Joi.string().required().min(2).max(1024).label("altGallery"),

    urlSketch: Joi.string().min(2).max(255).label("urlSketch"),
    altSketch: Joi.string().required().min(2).max(255).label("altSketch"),
    desSketch: Joi.string().required().min(2).max(1024).label("desSketch"),

    urlImaging: Joi.string().min(2).max(255).label("urlImaging"),
    altImaging: Joi.string().required().min(2).max(255).label("altImaging"),
    desImaging: Joi.string().required().min(2).max(1024).label("desImaging"),

    urlPlans: Joi.string().min(2).max(1024).label("urlPlans"),
    altPlans: Joi.string().required().min(2).max(1024).label("altPlans"),
    isPublished: Joi.boolean(),
  };

  checkName = name => name.replace(/\s/g, "-");
  checkSpaces = text => text.replace(/\s/g, "-");

  upload = () => {
    const {
      name,
      zip,
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
      altGallery,
      urlSketch,
      altSketch,
      desSketch,
      urlImaging,
      altImaging,
      desImaging,
      urlPlans,
      altPlans,
      isPublished,
    } = this.state.data;

    const { images } = this.state;

    const nameChecked = this.checkName(name.trim());
    const checkInput = (text, input) =>
      input ? formData.append(text, input.trim()) : null;
    const formData = new FormData();
    formData.append("name", nameChecked);
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
    formData.append("altGallery", altGallery);
    formData.append("isPublished", isPublished);

    for (let x = 0; x < images.length; x++) {
      for (let i of images[x]) {
        formData.append("images", i);
      }
    }

    return formData;
  };

  doSubmit = async () => {
    try {
      const formData = this.upload();
      const projectId = this.props.match.params.id;
      await editProject(formData, projectId);
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
        changePublishStatus(projectId);
        this.setState({
          isPublished: (project.isPublished = changeStatus),
        });
        return this.doSubmit();
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
              method="POST"
              encType="multipart/form-data">
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
                  true,
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
                  "col-4 mb-2 px-2",
                  "form-select p-2 rounded mb-2",
                  true
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
                {this.renderFileInputEdit(
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
                {this.renderFileInputEdit(
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
                {this.renderFileInputEdit(
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
                {this.renderFileInputEdit(
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

              <div className="d-flex flex-row-reverse">
                {this.renderInput(
                  "altGallery",
                  "תיאור התמונה לצורך נגישות",
                  false,
                  "text",
                  "col-8 mb-2  pr-0 pl-1"
                )}
                {this.renderFileInputEdit(
                  "urlGallery",
                  "העלה תמונה לגלריית התמונות",
                  false,
                  "text",
                  "col-4 mb-2 pr-1 pl-0"
                )}
              </div>
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
                {this.renderFileInputEdit(
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
                {this.renderFileInputEdit(
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
                {this.renderFileInputEdit(
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
