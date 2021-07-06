import React from "react";
import Titles from "../../../../common/titles";
import { url } from "../../../../../config.json";
import Form from "../../../../common/form";
import {
  deleteImage,
  editImage,
  getProject,
} from "../../../../../services/projectService";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { getCurrentUser } from "../../../../../services/userService";
import Swal from "sweetalert2";
import { Link, Redirect } from "react-router-dom";

class MyReferences extends Form {
  state = {
    data: {
      referance: "",
    },
    errors: {},
    counter: 0,
    images: [],
    project: "",
  };

  async componentDidMount() {
    let project = this.props.match.params.id;
    let { data } = await getProject(project);
    let images = data.images.references;
    const counter = images.length - 1;
    this.setState({ images, counter, project: data });
  }

  schema = {
    referance: Joi.string().required().min(2).max(255).label("referance"),
  };

  doSubmit = async () => {
    const { data, counter, project, images } = this.state;
    const projectId = project._id;
    const image = {
      imageId: images[counter]._id,
      remarks: data.referance,
    };

    try {
      const remarks = images.filter(image => {
        if (image._id === images[counter]._id) {
          image.remarks = data.referance;
          return image;
        }
        return image;
      });

      this.setState({ images: remarks, data: { referance: "" } });
      await editImage(projectId, image, "edit-referance");
      return toast("ההערה נשלחה בהצלחה!");
    } catch (error) {
      return toast(error.message);
    }
  };

  onArrowClick(symbol) {
    const { images } = this.state;
    let { counter } = this.state;
    if (symbol === "+") {
      counter !== images.length - 1 ? counter++ : (counter = 0);
    } else if (symbol === "-") {
      counter !== 0 ? counter-- : (counter = images.length - 1);
    } else counter = symbol;
    this.setState({ counter, data: { referance: "" } });
  }

  generateGallery() {
    const { images } = this.state;
    if (images.length) {
      return images.map((image, index) => {
        return (
          <div
            className="col-12 col-md-6 col-lg-4 col-xl-3  p-2 "
            key={image._id}>
            <img
              src={`${url}${image.url}`}
              alt={image.alt}
              className="w-100 border border-dark curser"
              onClick={() => {
                this.onArrowClick(index);
              }}
            />
          </div>
        );
      });
    }
    return "אין תמונות רפרנס לפרויקט הזה במאגר המידע";
  }

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
        let images = [...this.state.images];
        images = images.filter(image => image._id !== imageID);
        const projectId = this.props.match.params.id;
        const counter = images.length - 1;
        deleteImage(images, projectId, "delete-referance");
        this.setState({ images, counter });
        toast("התמונה נמחקה");
      }
    });
  };

  generageCard() {
    const { counter, images } = this.state;
    const user = getCurrentUser();

    if (images.length) {
      return (
        <div className="row px-3 border-0">
          <div className="col-12 col-lg-8 center p-0 p-lg-2">
            <img
              src={`${url}${images[counter].url}`}
              alt={images[counter].alt}
              className="w-100"
              id={images[counter]._id}
            />
          </div>

          <article className="col-12 col-lg-4 text-rtl">
            <form onSubmit={this.handleSubmit} autoComplete="off" method="POST">
              {this.renderTextarea(
                "referance",
                images[counter].remarks,
                "my-2 px-0 col-12 border border-0",
                "text-rtl m-0 col-12 rounded",
                "10"
              )}
              {user &&
                this.renderButton(
                  "שלח הערה",
                  "btn btn-lg btn-outline-dark btn-block my-3"
                )}

              {user && user.isAdmin && (
                <button
                  className="btn btn-outline-danger col-12"
                  onClick={e => {
                    this.handleImageDelete(images[counter]._id, e);
                  }}>
                  מחק תמונה
                </button>
              )}
            </form>
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
    return "אין תמונות רפרנס במאגר המידע";
  }

  render() {
    const user = getCurrentUser();
    const project = this.state.project;
    if (!user) return <Redirect to="/private-area/sign-in" />;
    if (user && user.isAdmin | (user._id === project.userID))
      return (
        <div id="theProcess" className=" container-fluid">
          <Titles
            titleBold="תמונות"
            title="רפרנס"
            subTitle={`כאן תוכל לראות ${
              user && user.isAdmin ? "להוסיף למחוק" : " "
            }  ולהעיר על תמונות הרפרנס של הפרויקט ${project.name}`}
          />

          {user.isAdmin && (
            <div className="center pb-3">
              <Link
                to={`/private-area/project/uploadReferance/${this.props.match.params.id}`}
                className="btn btn-outline-success border border-dark mt-2 ">
                &#10133; העלה תמונת רפרנס חדשה
              </Link>
            </div>
          )}

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
    return "אין תמונות רפרנס";
  }
}

export default MyReferences;
