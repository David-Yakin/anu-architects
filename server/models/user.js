const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
  name: {type: String, required: true, minlength: 2, maxlength: 255 },
  lastName:{ type: String, required: true, minlength: 2, maxlength: 255 },
  email: { type: String, required: true, minlength: 6, maxlength: 255, unique: true },
  phone:{ type: String, required: true, minlength: 9, maxlength: 14 },
  password: { type: String, required: true, minlength: 6, maxlength: 1024 },
  // confirmPassword: { type: String, required: true, minlength: 6, maxlength: 1024 },
  admin: { type: Boolean, required: true },
  isBloger: { type: Boolean, default:false },
  createdAt: { type: Date, default: Date.now },
  projectsLiked: [Object],
  
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, admin: this.admin, isBloger: this.isBloger }, config.get('jwtKey'));
  return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    lastName: Joi.string().required().min(2).max(255),
    email: Joi.string().min(6).max(255).required().email(),
    phone: Joi.string().required().min(9),    
    password: Joi.string().min(6).max(1024).required(),
    // confirmPassword: Joi.string().min(6).max(1024).required(),
    admin: Joi.boolean().required()
  });

  return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;
