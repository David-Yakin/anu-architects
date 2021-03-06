const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const string255 = {
  type: String,
  required: true,
  minlength: 2,
  maxlength: 255,
};

const userSchema = new mongoose.Schema({
  userID: { type: String, required: true, minlength: 6, maxlength: 14 },
  firstName: string255,
  lastName: string255,
  email: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 255,
    unique: true,
  },
  phone: { type: String, required: true, minlength: 9, maxlength: 14 },
  address: {
    country: string255,
    city: string255,
    street: string255,
    houseNumber: string255,
    zip: { type: String, required: true, minlength: 4, maxlength: 255 },
  },
  password: { type: String, required: true, minlength: 6, maxlength: 1024 },
  isAdmin: { type: Boolean, default: false },
  isBloger: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  projects: [String],
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin, isBloger: this.isBloger },
    config.get("jwtKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    userID: Joi.string().min(2).max(255).required(),
    firstName: Joi.string().min(2).max(255).required(),
    lastName: Joi.string().required().min(2).max(255),
    email: Joi.string().min(6).max(255).required().email(),
    phone: Joi.string()
      .required()
      .min(9)
      .regex(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/),
    address: {
      country: Joi.string().min(2).max(255).required(),
      city: Joi.string().min(2).max(255).required(),
      street: Joi.string().min(2).max(255).required(),
      houseNumber: Joi.string().min(2).max(255).required(),
      zip: Joi.string().min(2).max(14).required(),
    },
    password: Joi.string()
      .min(9)
      .max(20)
      .required()
      .regex(
        /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{9,20})/
      ),
  });
  return schema.validate(user);
}

function validateEmail(email) {
  const schema = Joi.object({ email: Joi.string().min(2).max(256).required() });
  return schema.validate(email);
}

function validatePassword(password) {
  const schema = Joi.object({
    password: Joi.string()
      .min(2)
      .max(256)
      .required()
      .regex(
        /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{9,20})/
      ),
  });
  return schema.validate(password);
}

exports.User = User;
exports.validateUser = validateUser;
exports.validateEmail = validateEmail;
exports.validatePassword = validatePassword;
