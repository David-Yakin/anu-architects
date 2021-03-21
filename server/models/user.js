const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const string255 = {type: String, required: true, minlength: 2, maxlength: 255}

const userSchema = new mongoose.Schema({
  userID: { type: String, required: true, minlength: 6, maxlength: 14 },
  name: string255,
  lastName: string255,
  email: { type: String, required: true, minlength: 8, maxlength: 255, unique: true },
  phone:{ type: String, required: true, minlength: 9, maxlength: 14 },
  adress: {
    country: string255,
    city: string255,
    street: string255,
    houseNumber : string255,
    zip: {type: String, required: true, minlength: 4, maxlength: 255}
  },
  password: { type: String, required: true, minlength: 6, maxlength: 1024 },
  admin: { type: Boolean, default:false },
  isBloger: { type: Boolean, default:false },
  createdAt: { type: Date, default: Date.now },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, admin: this.admin, isBloger: this.isBloger }, config.get('jwtKey'));
  return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = Joi.object({
    userID:  Joi.string().min(2).max(255).required(),
    name: Joi.string().min(2).max(255).required(),
    lastName: Joi.string().required().min(2).max(255),
    email: Joi.string().min(6).max(255).required().email(),
    phone: Joi.string().required().min(9),   
    adress: {
      country: Joi.string().min(2).max(255).required(),
      city: Joi.string().min(2).max(255).required(),
      street: Joi.string().min(2).max(255).required(),
      houseNumber : Joi.string().min(2).max(255).required(),
      zip: Joi.string().min(2).max(14).required(),
    },
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;
