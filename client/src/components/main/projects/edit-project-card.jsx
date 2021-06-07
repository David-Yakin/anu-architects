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
      year: "",
      size: "",
      category: "",
      description: "",
      country: "",
      city: "",
      cardUrl: "",
      cardAlt: "",
      //   urlPamorama: "",
      altPamorama: "",
      urlBefore: "",
      altBefore: "",
      desBefore: "",
      //   urlSketch: "",
      altSketch: "",
      desSketch: "",
      //   urlImaging: "",
      altImaging: "",
      desImaging: "",
      //   urlConstraction: "",
      altConstraction: "",
      desConstraction: "",
      //   urlGallery: "",
      altGallery: "",
    },
    errors: {},
    images: [],
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().required().min(2).max(255).label("name"),
    year: Joi.string().required().min(2).max(4).label("year"),
    size: Joi.string().required().min(2).max(255).label("size"),
    category: Joi.string().required().min(2).max(255).label("category"),
    description: Joi.string().required().min(2).max(1024).label("description"),
    country: Joi.string().required().min(2).max(255).label("country"),
    city: Joi.string().required().min(2).max(255).label("city"),
    cardUrl: Joi.string().min(2).max(255),
    cardAlt: Joi.string().required().min(2).max(255),
    urlPamorama: Joi.string().min(2).max(255).label("urlPamorama"),
    altPamorama: Joi.string().required().min(2).max(255).label("altPamorama"),
    urlBefore: Joi.string().min(2).max(255).label("urlBefore"),
    altBefore: Joi.string().min(2).max(255).label("altBefore"),
    desBefore: Joi.string().min(2).max(255).label("desBefore"),
    urlSketch: Joi.string().min(2).max(255).label("urlSketch"),
    altSketch: Joi.string().min(2).max(255).label("altSketch"),
    desSketch: Joi.string().min(2).max(255).label("desSketch"),
    urlImaging: Joi.string().min(2).max(255).label("urlImaging"),
    altImaging: Joi.string().min(2).max(255).label("altImaging"),
    desImaging: Joi.string().min(2).max(255).label("desImaging"),
    urlConstraction: Joi.string().min(2).max(255).label("urlConstraction"),
    altConstraction: Joi.string().min(2).max(255).label("altConstraction"),
    desConstraction: Joi.string().min(2).max(255).label("desConstraction"),
    urlGallery: Joi.string().min(2).max(255).label("urlGallery"),
    altGallery: Joi.string().min(2).max(255).label("altGallery"),
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
      year: project.year,
      size: project.size,
      category: project.category,
      description: project.description,
      country: project.country,
      city: project.city,
      cardAlt: project.cardAlt,
      altPamorama: project.altPamorama,
      altBefore: project.altBefore,
      desBefore: project.desBefore,
      altSketch: project.altSketch,
      desSketch: project.desSketch,
      altImaging: project.altImaging,
      desImaging: project.desImaging,
      altConstraction: project.altConstraction,
      desConstraction: project.desConstraction,
      altGallery: project.altGallery,
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
              {this.renderInput("name", "שם הפרויקט *", true)}
              {this.renderInput(
                "year",
                " השנה בה הסתיים הפרויקט *",
                true,
                "number"
              )}
              {this.renderInput(
                "size",
                "גודל הנכס במטר רבוע *",
                false,
                "number"
              )}
              {this.renderSelectBox("category", "בחר קטגוריה", [
                { text: "דירה", value: "apartment" },
                { text: "וילה", value: "villa" },
                { text: "בניין מגורים", value: "Building" },
                { text: "קומפלקס דירות", value: "apartment-complex" },
                { text: "מלון", value: "hotel" },
              ])}
              {this.renderTextarea("description", "תיאור הנכס *")}
              {this.renderInput("country", "הארץ בה מצוי הנכס  *")}
              {this.renderInput("city", "העיר בה מצוי הנכס  *")}
              {this.renderFileInput("cardUrl", "תמונה לכרטיס הפרוייקט *")}
              {this.renderInput("cardAlt", "תיאור התמונה לכרטיס הפרוייקט *")}
              {this.renderFileInput("urlPamorama", "תמונה של הנכס מבחוץ *")}
              {this.renderInput(
                "altPamorama",
                "תיאור של התמונה לצורך נגישות *"
              )}
              {this.renderFileInput(
                "urlBefore",
                "התמונה של הנכס לפני הבניה/ השיפוץ"
              )}
              {this.renderInput("altBefore", "תיאור של התמונה לצורך נגישות")}
              {this.renderTextarea(
                "desBefore",
                "תיאור מצב הנכס לפני תהליך הבניה/ השיפוץ"
              )}
              {this.renderFileInput("urlSketch", "סקיצה של הפרויקט")}
              {this.renderInput("altSketch", "תיאור של הסקיצה לצורך נגישות")}
              {this.renderTextarea("desSketch", "תיאור תהליך העבודה על הסקיצה")}
              {this.renderFileInput("urlImaging", "הדמייה של הפרויקט")}
              {this.renderInput("altImaging", "תיאור של ההדמייה לצורך נגישות")}
              {this.renderTextarea(
                "desImaging",
                "תיאור תהליך העבודה על ההדמייה"
              )}
              {this.renderFileInput(
                "urlConstraction",
                "תמונה מהשיפוצים / הבנייה של הפרויקט"
              )}
              {this.renderInput(
                "altConstraction",
                "תיאור של התמונה לצורך נגישות"
              )}
              {this.renderTextarea(
                "desConstraction",
                "תיאור תהליך הבנייה / השיפוץ"
              )}
              {this.renderFileInput("urlGallery", "תמונה לגלריית התמונות")}
              {this.renderInput("altGallery", "תיאור של התמונה לצורך נגישות")}
              {this.renderButton(
                "שלח",
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
