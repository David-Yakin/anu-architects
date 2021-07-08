import React from "react";
import Joi from "joi-browser";
import Form from "../../../../common/form";
import { Link } from "react-router-dom";
import { uploadImage } from "../../../../../services/projectService";
import { toast } from "react-toastify";

class CreateExpert extends Form {
  state = {
    data: {
      imageUrl: "", // file-url
      imageAlt: "", // file-alt
      firstName: "",
      lastName: "",
      phone: "",
      category: "",
    },
    images: [],
    errors: {},
  };

  schema = {
    imageUrl: Joi.string().required().min(2).max(255).label("imageUrl"),
    imageAlt: Joi.string().required().min(2).max(255).label("imageAlt"),
    firstName: Joi.string().required().min(2).max(255).label("firstName"),
    lastName: Joi.string().required().min(2).max(255).label("lastName"),
    phone: Joi.string()
      .required()
      .min(2)
      .max(255)
      .regex(/0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}/)
      .label("phone"),
    category: Joi.string().required().min(2).max(255).label("category"),
  };

  upload = () => {
    const { imageUrl, imageAlt, firstName, lastName, phone, category } =
      this.state.data;

    const categoryText = value => {
      if (value === "entrepreneur") return "ייזום וארגון";
      if (value === "project-managing") return "ניהול פרויקט";
      if (value === "conservation-architect") return "אדריכל שימור";
      if (value === "construction") return "קונסטרוקציה";
      if (value === "air-conditioning") return "מיזוג אוויר";
      if (value === "plumbing") return "אינסטלציה";
      if (value === "electricity") return "חשמל";
      if (value === "pools") return "בריכות";
      if (value === "Hydrologist") return "הידרולוג";
      if (value === "ground") return "קרקע";
      if (value === "elevators") return "מעליות";
      if (value === "safety") return "בטיחות";
      if (value === "protection") return "מיגון";
      if (value === "trash") return "אשפה";
      if (value === "sealing") return "איטום";
      if (value === "acoustics") return "אקוסטיקה";
      if (value === "duplication") return "העתקות";
    };

    const { images } = this.state;
    const data = new FormData();
    data.append("imageUrl", imageUrl);
    data.append("imageAlt", imageAlt);
    data.append("firstName", firstName);
    data.append("lastName", lastName);
    data.append("phone", phone);
    data.append("category", category);
    data.append("categoryText", categoryText(category.trim()));

    for (let x = 0; x < images.length; x++) {
      for (let i of images[x]) {
        data.append("images", i);
      }
    }
    return data;
  };

  doSubmit = async () => {
    try {
      const image = this.upload();
      const projectId = this.props.match.params.id;
      await uploadImage(image, projectId, "createExpert");
      toast("הפרויקט עודכן בהצלחה!");
      return this.props.history.replace(
        `/private-area/project/experts/${this.props.match.params.id}`
      );
    } catch (error) {
      console.log(error.message);
      if (error) {
        this.setState({ errors: { imageUrl: error.message } });
      }
    }
  };

  render() {
    return (
      <div className="container-fluid sign-in">
        <div className="center ">
          <form
            onSubmit={this.handleSubmit}
            autoComplete="off"
            method="POST"
            className="border border-light rounded p-4 bg-light">
            <h1 className="h3 mb-3 font-weight-normal text-dark text-center px-0">
              מומחים ויועצים
            </h1>

            {this.renderSelectBox("category", "בחר קטגוריה *", [
              { text: "ייזום וארגון", value: "entrepreneur" },
              { text: "ניהול פרויקט", value: "project-managing" },
              { text: "אדריכל שימור", value: "conservation-architect" },
              { text: "קונסטרוקציה", value: "construction" },
              { text: "מיזוג אוויר", value: "air-conditioning" },
              { text: "אינסטלציה", value: "plumbing" },
              { text: "חשמל", value: "electricity" },
              { text: "בריכות", value: "pools" },
              { text: "הידרולוג", value: "Hydrologist" },
              { text: "קרקע", value: "ground" },
              { text: "מעליות", value: "elevators" },
              { text: "בטיחות", value: "safety" },
              { text: "מיגון", value: "protection" },
              { text: "אשפה", value: "trash" },
              { text: "איטום", value: "sealing" },
              { text: "אקוסטיקה", value: "acoustics" },
              { text: "העתקות", value: "duplication" },
            ])}
            {this.renderInput("firstName", "שם פרטי *")}
            {this.renderInput("lastName", "שם משפחה *")}
            {this.renderInput("phone", "טלפון *")}
            {this.renderFileInput("imageUrl", "העלה טופס", false, ".pdf")}
            {this.renderInput("imageAlt", "תאר את סוג הטופס *")}

            <div className="center">
              <Link
                className="a-herf mb-2 text-rtl"
                to={`/private-area/project/experts/${this.props.match.params.id}`}>
                {" "}
                התחרטת?
                <span className="font-weight-bold text-primary"> לחץ כאן</span>
              </Link>
            </div>

            {this.renderButton("שלח", "btn btn-lg btn-outline-dark btn-block")}
          </form>
        </div>
      </div>
    );
  }
}

export default CreateExpert;
