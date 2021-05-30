const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const string255 = { type: String,  required: true,  minlength: 2,  maxlength: 255 }

const schema = new mongoose.Schema({
    name: string255, 
    lastName:string255, 
    email: { type: String, required: true, minlength: 8, maxlength: 255 },
    phone:{ type: String, required: true, minlength: 9, maxlength: 14 },
    subject:string255, 
    message: string255,
    createdAt: { type: Date, default: Date.now },
});

const Mail = mongoose.model('Mail', schema);

function validateMail(mail) {
const schema = Joi.object({
    name: Joi.string().required().min(2).max(255),
    lastName: Joi.string().required().min(2).max(255),
    email: Joi.string().required().email().min(6).max(256),
    subject: Joi.string().required().min(2).max(255),
    phone: Joi.string().min(2).max(14),
    message: Joi.string().required().min(2).max(1024)
  })
  return schema.validate(mail);
}

exports.Mail = Mail;
exports.validateMail = validateMail;