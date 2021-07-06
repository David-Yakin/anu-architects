import React from "react";
import Joi from "joi-browser";
import Form from "../../common/form";
import { Redirect } from "react-router-dom";
import { login, getCurrentUser } from "../../../services/userService";
import { Link } from "react-router-dom";

class Signin extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("mail"),
    password: Joi.string().required().min(8).label("password"),
  };

  doSubmit = async () => {
    const { email, password } = this.state.data;

    try {
      await login(email, password);
      let user = getCurrentUser();
      if (user && user.isAdmin)
        return (window.location = "/private-area/users");
      if (user && !user.isAdmin && user.isBloger)
        return (window.location = "/private-area/blogs-search-page");
      window.location = `/private-area/user/${user._id}`;
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ errors: { email: ex.response.data } });
      }
    }
  };

  render() {
    let user = getCurrentUser();
    if (user && user.isAdmin === true)
      return <Redirect to="/private-area/users" />;
    if (user) return <Redirect to={`/private-area/user/${user._id}`} />;

    return (
      <div className="container-fluid sign-in">
        <div className="center ">
          <form
            onSubmit={this.handleSubmit}
            autoComplete="off"
            method="POST"
            className="border border-light rounded p-4 bg-light">
            <h1 className="h3 mb-3 font-weight-normal text-dark text-center px-0">
              טופס הירשמות
            </h1>

            {this.renderInput("email", "מייל", false, "email")}
            {this.renderInput("password", "סיסמה", false, "password")}

            <div className="center">
              <Link
                className="a-herf mb-2 text-rtl"
                to="/private-area/forgot-password">
                {" "}
                שכחת סיסמה?
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

export default Signin;
