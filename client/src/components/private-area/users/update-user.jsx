import React from "react";
import Joi from "joi-browser";
import Form from "../../common/form";
import { toast } from "react-toastify";
import { getUser, editUser } from "../../../services/userService";

class UpdateUser extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      phone: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      zip: "",
    },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    firstName: Joi.string().required().min(2).max(255).label("name"),
    lastName: Joi.string().required().min(2).max(255).label("last name"),
    phone: Joi.string().required().min(9).max(14).label("phone"),
    country: Joi.string().required().min(2).max(255).label("country"),
    city: Joi.string().required().min(2).max(255).label("city"),
    street: Joi.string().required().min(2).max(255).label("street"),
    houseNumber: Joi.string().required().min(2).max(255).label("houseNumber"),
    zip: Joi.string().required().min(2).max(255).label("zip"),
  };

  async componentDidMount() {
    const userId = this.props.match.params.id;
    const { data } = await getUser(userId);
    this.setState({ data: this.mapToNewModel(data) });
  }

  mapToNewModel({ _id, firstName, lastName, phone, address }) {
    return {
      _id,
      firstName,
      lastName,
      phone,
      country: address.country,
      city: address.city,
      street: address.street,
      houseNumber: address.houseNumber,
      zip: address.zip,
    };
  }

  doSubmit = async () => {
    const data = { ...this.state.data };
    await editUser(data);
    toast(`${data.name} עדכון הפרטים שלך נשמר בהצלחה`);
    this.props.history.replace("/private-area/my-projects");
  };

  render() {
    return (
      <div className="container-fluid sign-up">
        <div className="center ">
          <form
            onSubmit={this.handleSubmit}
            autoComplete="off"
            method="POST"
            className="border border-light rounded p-4 bg-light col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3 mt-4">
            <h1 className="h3 mb-3 font-weight-normal text-dark text-center">
              עדכון פרטים
            </h1>

            {this.renderInput("firstName", "שם פרטי", true)}
            {this.renderInput("lastName", "שם משפחה", true)}
            {this.renderInput("phone", "טלפון", false, "phone")}
            {this.renderInput("country", "ארץ")}
            {this.renderInput("city", "עיר")}
            {this.renderInput("street", "רחוב")}
            {this.renderInput("houseNumber", "מספר בית")}
            {this.renderInput("zip", "מיקוד")}

            {this.renderButton("עדכן", "btn btn-lg btn-outline-dark btn-block")}
          </form>
        </div>
      </div>
    );
  }
}

export default UpdateUser;
