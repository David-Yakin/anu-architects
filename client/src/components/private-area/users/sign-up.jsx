import React from "react";
import Joi from "joi-browser";
import Form from "../../common/form";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import {
  getCurrentUser,
  login,
  createUser,
} from "../../../services/userService";
import StrenthMeter from "../../common/strength-meter/strength-meter";

class Signup extends Form {
  state = {
    data: {
      userID: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      zip: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    userID: Joi.string().required().min(8).max(255).label("userID"),
    firstName: Joi.string().required().min(2).max(255).label("firstName"),
    lastName: Joi.string().required().min(2).max(255).label("lastName"),
    email: Joi.string().required().email().label("mail"),
    phone: Joi.string()
      .required()
      .min(9)
      .max(14)
      .regex(/0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}/g)
      .label("phone"),
    country: Joi.string().required().min(2).max(255).label("country"),
    city: Joi.string().required().min(2).max(255).label("city"),
    street: Joi.string().required().min(2).max(255).label("street"),
    houseNumber: Joi.string().required().min(1).max(255).label("houseNumber"),
    zip: Joi.string().required().min(4).max(255).label("zip"),
    password: Joi.string().required().min(9).max(1024).label("password"),
  };

  doSubmit = async () => {
    const passwordInput = document.getElementById("password-input");
    const passwordCheck = document.getElementById("password");
    if (passwordInput.value !== passwordCheck.value)
      return this.setState({ errors: { password: "הסיסמה לא תואמת" } });
    const user = { ...this.state.data };
    const { email, password } = this.state.data;
    try {
      const { data } = await createUser(user);
      await login(email, password);
      window.location = `/private-area/user/${data._id}`;
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ errors: { email: "המייל הזה תפוס" } });
      }
    }
  };

  render() {
    let user = getCurrentUser();
    if (user && user.isAdmin) return <Redirect to="/private-area/users" />;
    if (user) return <Redirect to={`/private-area/user/${user._id}`} />;

    return (
      <div className="container-fluid sign-up">
        <div className="center py-4">
          <form
            onSubmit={this.handleSubmit}
            autoComplete="off"
            method="POST"
            className="border border-light rounded p-4 bg-light col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3">
            <h1 className="h3 mb-3 font-weight-normal text-dark text-center">
              טופס הירשמות
            </h1>

            {this.renderInput("userID", "מספר תעודת זהות *")}
            {this.renderInput("firstName", "שם פרטי *")}
            {this.renderInput("lastName", "שם משפחה *")}
            {this.renderInput("email", "מייל *", false, "email")}
            {this.renderInput("phone", "טלפון *", false, "phone")}
            {this.renderInput("country", "ארץ *")}
            {this.renderInput("city", "עיר *")}
            {this.renderInput("street", "רחוב *")}
            {this.renderInput("houseNumber", "מספר בית *", false, "number")}
            {this.renderInput("zip", "מיקוד *", false, "number")}
            <StrenthMeter />

            {this.renderInput(
              "password",
              "חזור על הסיסמה *",
              false,
              "password"
            )}

            <div className="center">
              <Link className="a-herf mb-2 text-rtl" to="/private-area/sign-in">
                {" "}
                משתמש רשום?
                <span className="font-weight-bold text-primary"> התחבר</span>
              </Link>
            </div>

            {this.renderButton("שלח", "btn btn-lg btn-outline-dark btn-block")}
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
