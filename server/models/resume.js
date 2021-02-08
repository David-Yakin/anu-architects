const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 2, maxlength: 255},
    subTitle: { type: String, required: true, minlength: 2, maxlength: 255},
    firstP: { type: String, required: true, minlength: 2, maxlength: 1024},
    secondp: { type: String, required: true, minlength: 2, maxlength: 1024},
    thirdP: { type: String, required: true, minlength: 2, maxlength: 1024},
    fourthP: { type: String, required: true, minlength: 2, maxlength: 1024},
    profileUrl: { type: String, required: true, minlength: 2, maxlength: 255},
    profileAlt: { type: String, required: true, minlength: 2, maxlength: 255},
    createdAt: { type: Date, default: Date.now },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Resume = mongoose.model('Resume', resumeSchema);

function validateResume(resume) {

  const schema = Joi.object({
    title: Joi.string().required().min(2).max(255),
    subTitle: Joi.string().min(2).max(255).required(),
    firstP: Joi.string().required().min(2).max(1024),
    secondp: Joi.string().required().min(2).max(1024),
    thirdP: Joi.string().required().min(2).max(1024),
    fourthP: Joi.string().required().min(2).max(1024),
    profileUrl: Joi.string().required().min(2).max(255),
    profileAlt: Joi.string().required().min(2).max(255),
  });

  return schema.validate(resume);
}

exports.Resume = Resume;
exports.validateResume = validateResume;
