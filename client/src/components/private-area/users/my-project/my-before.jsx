import React from "react";
import Titles from "../../../common/titles";
import { url } from "../../../../config.json";
import Form from "../../../common/form";
import {
  deleteImage,
  uploadImage,
  getProject,
} from "../../../../services/projectService";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { getCurrentUser } from "../../../../services/userService";
import Swal from "sweetalert2";
import { Link, Redirect } from "react-router-dom";

class MyBefore extends Form {
  state = {
    data: { imageUrl: "", imageAlt: "" },
    errors: {},
    counter: 0,
    images: [],
    slider: [],
    project: "",
  };

  async componentDidMount() {
    let project = this.props.match.params.id;
    let { data } = await getProject(project);
    let slider = data.images.before;
    const counter = slider.length - 1;
    this.setState({ slider, counter, project: data });
  }

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
      await uploadImage(image, projectId, "uploadBefore");
      let { data } = await getProject(projectId);
      let slider = data.images.before;
      const counter = slider.length - 1;
      this.setState({ slider, counter, project: data });
      return toast("הפרויקט עודכן בהצלחה!");
    } catch (error) {
      console.log(error.message);
      if (error) {
        this.setState({ errors: { imageUrl: error.message } });
      }
    }
  };

  handleImageDelete = async (imageID, e) => {
    e.preventDefault();
    Swal.fire({
      title: "?האם אתה בטוח",
      text: "!התמונה תימחק ממאגר המידע",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "כן, אני רוצה למחוק!",
      cancelButtonText: "בטל",
    }).then(result => {
      if (result.isConfirmed) {
        let slider = [...this.state.slider];
        slider = slider.filter(image => image._id !== imageID);
        const projectId = this.props.match.params.id;
        const counter = slider.length - 1;
        deleteImage(slider, projectId, "delete-before");
        this.setState({ slider, counter });
        toast("התמונה נמחקה");
      }
    });
  };

  onArrowClick(symbol) {
    const { slider } = this.state;
    let { counter } = this.state;
    if (symbol === "+") {
      counter !== slider.length - 1 ? counter++ : (counter = 0);
    } else if (symbol === "-") {
      counter !== 0 ? counter-- : (counter = slider.length - 1);
    } else counter = symbol;
    this.setState({ counter, data: { sketches: "" } });
  }

  generateGallery() {
    const { slider } = this.state;
    if (slider.length) {
      return slider.map((slide, index) => {
        return (
          <div
            className="col-12 col-md-6 col-lg-4 col-xl-3  p-2 "
            key={slide._id}>
            <img
              src={`${url}${slide.url}`}
              alt={slide.alt}
              className="w-100 border border-dark curser"
              onClick={() => {
                this.onArrowClick(index);
              }}
            />
          </div>
        );
      });
    }
    return "אין תמונות לפני של הפרויקט הזה במאגר המידע";
  }

  generageCard() {
    const { counter, slider } = this.state;
    const user = getCurrentUser();

    if (slider.length) {
      return (
        <div className="row px-3 border-0">
          <div className="col-12  center p-0 p-lg-2">
            <img
              src={`${url}${slider[counter].url}`}
              alt={slider[counter].alt}
              className="w-100"
              id={slider[counter]._id}
            />
          </div>

          <article className="col-12 text-rtl">
            {user && user.isAdmin && (
              <button
                className="btn btn-outline-danger col-12"
                onClick={e => {
                  this.handleImageDelete(slider[counter]._id, e);
                }}>
                מחק תמונה
              </button>
            )}
          </article>

          <i
            className="fa fa-chevron-right next"
            onClick={() => this.onArrowClick("-")}></i>
          <i
            className="fa fa-chevron-left prev"
            onClick={() => this.onArrowClick("+")}></i>
        </div>
      );
    }
    return "אין תמונות לפני הבניה או השיפוץ של הפרויקט במאגר המידע";
  }
  generateForm() {
    return (
      <div className="center">
        <form
          className="col-10 bg-light rounded mb-4 pt-2"
          onSubmit={this.handleSubmit}
          autoComplete="off"
          method="POST">
          <div className="d-flex flex-row-reverse">
            {this.renderInput(
              "imageAlt",
              "תיאור תמונת לפני הבניה והשיפוץ של הפרויקט ",
              false,
              "text",
              "col-8 mb-2  pr-0 pl-1"
            )}
            {this.renderFileInput(
              "imageUrl",
              "העלה תמונת לפני  ",
              false,
              "text",
              "col-4 mb-2 pr-1 pl-0"
            )}
          </div>
          {this.renderButton(
            "העלה תמונה",
            "btn btn-lg btn-outline-dark btn-block my-3"
          )}
        </form>
      </div>
    );
  }
  render() {
    const user = getCurrentUser();
    const project = this.state.project;
    if (!user | (user.isAdmin === false))
      return <Redirect to="/private-area/sign-in" />;
    if (user && user.isAdmin | (user._id === project.userID))
      return (
        <div id="theProcess" className=" container-fluid">
          <Titles
            titleBold="תמונות"
            title="לפני הבניה והשיפוץ"
            subTitle="כאן תוכל לראות להוסיף או למחוק תמונות של הנכס לפני הבניה והשיפוץ"
          />

          <div className="container">{this.generateForm()}</div>

          <div className="slideShow_container pb-5">
            <div className="center shadow-lg">
              <div className="row col-12 p-4">{this.generageCard()}</div>
            </div>
          </div>
          <div className="col-12 row pb-3 px-0">{this.generateGallery()}</div>

          <div className="center pb-3">
            <Link
              to={`/private-area/user/${project.userID}`}
              className="btn btn-outline-dark border border-dark mt-2 ">
              חזור לכרטיס המשתמש
            </Link>
          </div>
        </div>
      );
    return <Redirect to="/private-area/sign-in" />;
  }
}

export default MyBefore;
