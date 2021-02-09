const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 255},
  year: { type: String, required: true, minlength: 2, maxlength: 4},
  size: { type: String, required: true, minlength: 2, maxlength: 255},
  category: { type: String, required: true, minlength: 2, maxlength: 255},
  description: { type: String, required: true, minlength: 2, maxlength: 1024},
  country: { type: String, required: true, minlength: 2, maxlength: 255},
  city: { type: String, required: true, minlength: 2, maxlength: 255},
  cardUrl:{ type: String, required: true, minlength: 2, maxlength: 255},
  cardAlt:{ type: String, required: true, minlength: 2, maxlength: 255},
  urlPamorama: { type: String, required: true, minlength: 2, maxlength: 1024},
  altPamorama: { type: String, required: true, minlength: 2, maxlength: 255},
  urlBefore: { type: String, required: true, minlength: 2, maxlength: 1024},
  altBefore: { type: String, required: true, minlength: 2, maxlength: 255},
  desBefore: { type: String, required: true, minlength: 2, maxlength: 1024},
  urlSketch: { type: String, required: true, minlength: 2, maxlength: 255},
  altSketch: { type: String, required: true, minlength: 2, maxlength: 255},
  desSketch: { type: String, required: true, minlength: 2, maxlength: 1024},
  urlImaging: { type: String, required: true, minlength: 2, maxlength: 255},
  altImaging: { type: String, required: true, minlength: 2, maxlength: 255},
  desImaging: { type: String, required: true, minlength: 2, maxlength: 1024},
  urlConstraction: { type: String, required: true, minlength: 2, maxlength: 255},
  altConstraction: { type: String, required: true, minlength: 2, maxlength: 255},
  desConstraction: { type: String, required: true, minlength: 2, maxlength: 1024},
  urlGallery: { type: String, required: true, minlength: 2, maxlength: 1024},
  altGallery: { type: String, required: true, minlength: 2, maxlength: 255},
  createdAt: { type: Date, default: Date.now },
  counter: { type: String, default: 0},
  isLiked: {type: Boolean, default: false},

});

const Project = mongoose.model('Project', projectSchema);

function validateProject(project) {

  const schema = Joi.object({
    name: Joi.string().required().min(2).max(255),
    year: Joi.string().min(2).max(4).required(),
    size: Joi.string().required().min(2).max(255),
    category: Joi.string().required().min(2).max(255),
    description: Joi.string().required().min(2).max(1024),
    country: Joi.string().required().min(2).max(255),
    city: Joi.string().required().min(2).max(255),
    cardUrl: Joi.string().required().min(2).max(255),
    cardAlt: Joi.string().required().min(2).max(255),
    urlPamorama: Joi.string().required().min(2).max(255),
    altPamorama: Joi.string().required().min(2).max(255),
    urlBefore: Joi.string().min(2).max(255),
    altBefore: Joi.string().min(2).max(255),
    desBefore: Joi.string().min(2).max(1024),
    urlSketch: Joi.string().min(2).max(255),
    altSketch: Joi.string().min(2).max(255),
    desSketch: Joi.string().min(2).max(1024),
    urlImaging: Joi.string().min(2).max(255),
    altImaging: Joi.string().min(2).max(255),
    desImaging: Joi.string().min(2).max(1024),
    urlConstraction: Joi.string().min(2).max(255),
    altConstraction: Joi.string().min(2).max(255),
    desConstraction: Joi.string().min(2).max(1024),
    urlGallery: Joi.string().min(2).max(1024),
    altGallery: Joi.string().min(2).max(255),
  });

  return schema.validate(project);
}

exports.Project = Project;
exports.validateProject = validateProject;
