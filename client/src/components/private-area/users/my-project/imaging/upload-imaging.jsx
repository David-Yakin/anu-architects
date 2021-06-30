import React from "react";
import Joi from "joi-browser";
import Form from "../../../../common/form";
import { Link } from "react-router-dom";
import { uploadImage } from "../../../../../services/projectService";
import { toast } from "react-toastify";

class uploadImaging extends Form {
  state = {
    data: { imageUrl: "", imageAlt: "" },
    images: [],
    errors: {},
  };

  schema = {
    imageUrl: Joi.string().required().min(2).max(255).label("imageUrl"),
    imageAlt: Joi.string().required().min(2).max(255).label("imageAlt"),
  };

  upload = () => {
    const { imageUrl, imageAlt } = this.state.data;
    const { images } = this.state;
    const data = new FormData();
    data.append("imageUrl", imageUrl);
    data.append("imageAlt", imageAlt);

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
      await uploadImage(image, projectId, "uploadImaging");
      toast("הפרויקט עודכן בהצלחה!");
      return this.props.history.replace(
        `/private-area/project/imaging/${this.props.match.params.id}`
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
              הדמיה
            </h1>

            {this.renderFileInput("imageUrl", "העלה")}
            {this.renderInput("imageAlt", "תאר את ההדמיה")}

            <div className="center">
              <Link
                className="a-herf mb-2 text-rtl"
                to={`/private-area/project/imaging/${this.props.match.params.id}`}>
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

export default uploadImaging;
