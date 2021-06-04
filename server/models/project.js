const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const string256R = {
  type: String,
  required: true,
  minlength: 2,
  maxlength: 256,
};
const string256 = { type: String, minlength: 2, maxlength: 256 };
const string1024R = {
  type: String,
  required: true,
  minlength: 2,
  maxlength: 1024,
};
const string1024 = { type: String, minlength: 2, maxlength: 1024 };

const schema = new mongoose.Schema({
  name: string256R,
  year: { type: String, required: true, minlength: 2, maxlength: 4 },
  size: string256,
  category: string256,
  address: {
    country: string256R,
    city: string256R,
    street: string256R,
    houseNumber: string256R,
    zip: string256,
  },
  description: string1024,
  files: {
    contracts: [{ name: string256, url: string256, remarks: string1024 }],
    licensing: [{ name: string256, url: string256, remarks: string1024 }],
    experts: [
      {
        firstName: string256,
        lastName: string256,
        phone: string256,
        url: string256,
        remarks: string1024,
      },
    ],
  },
  images: {
    card: {
      url: string256,
      alt: {
        type: String,
        minlength: 2,
        maxlength: 256,
        default: "תמונה לכרטיס הפרויקט",
      },
    },
    panorama: {
      url: string256,
      alt: {
        type: String,
        minlength: 2,
        maxlength: 256,
        default: "תמונת פנורמה של הפרויקט",
      },
    },
    before: [
      {
        url: string256,
        description: string1024,
        alt: {
          type: String,
          minlength: 2,
          maxlength: 256,
          default: "תמונת לפני העבודה על  הפרויקט",
        },
      },
    ],
    constraction: [
      {
        url: string256,
        description: string1024,
        alt: {
          type: String,
          minlength: 2,
          maxlength: 256,
          default: "תמונה מהבניה או השיפוץ של הפרויקט",
        },
      },
    ],
    sketches: [
      {
        url: string256,
        description: string1024,
        remarks: string1024,
        alt: {
          type: String,
          minlength: 2,
          maxlength: 256,
          default: "שרטוט של הפרויקט",
        },
      },
    ],
    imaging: [
      {
        url: string256,
        description: string1024,
        remarks: string1024,
        alt: {
          type: String,
          minlength: 2,
          maxlength: 256,
          default: "הדמיה של הפרויקט",
        },
      },
    ],
    plans: [
      {
        url: string256,
        remarks: string1024,
        alt: {
          type: String,
          minlength: 2,
          maxlength: 256,
          default: "תוכנית ארכיטקטית של הפרויקט",
        },
      },
    ],
    references: [
      {
        url: string256,
        remarks: string1024,
        alt: {
          type: String,
          minlength: 2,
          maxlength: 256,
          default: "תוכנית ארכיטקטית של הפרויקט",
        },
      },
    ],
    gallery: [string256],
  },
  userID: string256R,
  isPublished: { type: Boolean, default: false },
  isOpen: { type: Boolean, default: false },
  counter: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Project = mongoose.model("Project", schema);

function validateProject(project) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(256).required(),
    year: Joi.string().min(2).max(4).required(),
    size: Joi.string().min(2).max(256).required(),
    category: Joi.string().min(2).max(256).required(),

    country: Joi.string().min(2).max(256).required(),
    city: Joi.string().min(2).max(256).required(),
    street: Joi.string().min(2).max(256).required(),
    houseNumber: Joi.string().min(2).max(256).required(),
    zip: Joi.string().min(2).max(256),

    description: Joi.string().required().min(2).max(1024),

    contracts: Joi.array().items(
      Joi.object().keys({
        name: Joi.string().min(2).max(256),
        url: Joi.string().min(2).max(256),
        remarks: Joi.string().min(2).max(1024),
      })
    ),

    licensing: Joi.array().items(
      Joi.object().keys({
        name: Joi.string().min(2).max(256),
        url: Joi.string().min(2).max(256),
        remarks: Joi.string().min(2).max(1024),
      })
    ),

    experts: Joi.array().items(
      Joi.object().keys({
        firstName: Joi.string().min(2).max(256),
        lastName: Joi.string().min(2).max(256),
        phone: Joi.string().min(2).max(256),
        url: Joi.string().min(2).max(256),
        remarks: Joi.string().min(2).max(1024),
      })
    ),

    images: Joi.object().keys({
      card: Joi.object().keys({
        url: Joi.string().min(2).max(256),
        alt: Joi.string().min(2).max(256),
      }),
      panorama: Joi.object().keys({
        url: Joi.string().min(2).max(256),
        alt: Joi.string().min(2).max(256),
      }),
      before: Joi.array().items(
        Joi.object().keys({
          url: Joi.string().min(2).max(256),
          alt: Joi.string().min(2).max(256),
          description: Joi.string().min(2).max(1024),
        })
      ),
      constraction: Joi.array().items(
        Joi.object().keys({
          url: Joi.string().min(2).max(256),
          alt: Joi.string().min(2).max(256),
          description: Joi.string().min(2).max(1024),
        })
      ),
      sketches: Joi.array().items(
        Joi.object().keys({
          url: Joi.string().min(2).max(256),
          alt: Joi.string().min(2).max(256),
          description: Joi.string().min(2).max(1024),
          remarks: Joi.string().min(2).max(1024),
        })
      ),
      imaging: Joi.array().items(
        Joi.object().keys({
          url: Joi.string().min(2).max(256),
          alt: Joi.string().min(2).max(256),
          description: Joi.string().min(2).max(1024),
          remarks: Joi.string().min(2).max(1024),
        })
      ),
      plans: Joi.array().items(
        Joi.object().keys({
          url: Joi.string().min(2).max(256),
          alt: Joi.string().min(2).max(256),
          remarks: Joi.string().min(2).max(1024),
        })
      ),
      references: Joi.array().items(
        Joi.object().keys({
          url: Joi.string().min(2).max(256),
          alt: Joi.string().min(2).max(256),
          remarks: Joi.string().min(2).max(1024),
        })
      ),
      gallery: Joi.array().items(Joi.string().min(2).max(256)),
    }),
  });
  return schema.validate(project);
}

exports.Project = Project;
exports.validateProject = validateProject;

// const Joi = require('@hapi/joi');
// const mongoose = require('mongoose');

// const schema = new mongoose.Schema({
//   name: { type: String, required: true, minlength: 2, maxlength: 255},
//   year: { type: String, required: true, minlength: 2, maxlength: 4},
//   size: { type: String, required: true, minlength: 2, maxlength: 255},
//   category: { type: String, required: true, minlength: 2, maxlength: 255},
//   description: { type: String, required: true, minlength: 2, maxlength: 1024},
//   country: { type: String, required: true, minlength: 2, maxlength: 255},
//   city: { type: String, required: true, minlength: 2, maxlength: 255},
//   cardUrl:{ type: String, required: true, minlength: 2, maxlength: 255},
//   cardAlt:{ type: String, required: true, minlength: 2, maxlength: 255},
//   urlPamorama: { type: String, required: true, minlength: 2, maxlength: 1024},
//   altPamorama: { type: String, required: true, minlength: 2, maxlength: 255},
//   urlBefore: { type: String, required: true, minlength: 2, maxlength: 1024},
//   altBefore: { type: String, required: true, minlength: 2, maxlength: 255},
//   desBefore: { type: String, required: true, minlength: 2, maxlength: 1024},
//   urlSketch: { type: String, required: true, minlength: 2, maxlength: 255},
//   altSketch: { type: String, required: true, minlength: 2, maxlength: 255},
//   desSketch: { type: String, required: true, minlength: 2, maxlength: 1024},
//   urlImaging: { type: String, required: true, minlength: 2, maxlength: 255},
//   altImaging: { type: String, required: true, minlength: 2, maxlength: 255},
//   desImaging: { type: String, required: true, minlength: 2, maxlength: 1024},
//   urlConstraction: { type: String, required: true, minlength: 2, maxlength: 255},
//   altConstraction: { type: String, required: true, minlength: 2, maxlength: 255},
//   desConstraction: { type: String, required: true, minlength: 2, maxlength: 1024},
//   urlGallery: { type: String, required: true, minlength: 2, maxlength: 1024},
//   altGallery: { type: String, required: true, minlength: 2, maxlength: 255},
//   createdAt: { type: Date, default: Date.now },
// });

// const Project = mongoose.model('Project', schema);

// function validateProject(project) {
//   const schema = Joi.object({
//     name: Joi.string().required().min(2).max(255),
//     year: Joi.string().min(2).max(4).required(),
//     size: Joi.string().required().min(2).max(255),
//     category: Joi.string().required().min(2).max(255),
//     description: Joi.string().required().min(2).max(1024),
//     country: Joi.string().required().min(2).max(255),
//     city: Joi.string().required().min(2).max(255),
//     cardUrl: Joi.string().required().min(2).max(255),
//     cardAlt: Joi.string().required().min(2).max(255),
//     urlPamorama: Joi.string().required().min(2).max(255),
//     altPamorama: Joi.string().required().min(2).max(255),
//     urlBefore: Joi.string().min(2).max(255),
//     altBefore: Joi.string().min(2).max(255),
//     desBefore: Joi.string().min(2).max(1024),
//     urlSketch: Joi.string().min(2).max(255),
//     altSketch: Joi.string().min(2).max(255),
//     desSketch: Joi.string().min(2).max(1024),
//     urlImaging: Joi.string().min(2).max(255),
//     altImaging: Joi.string().min(2).max(255),
//     desImaging: Joi.string().min(2).max(1024),
//     urlConstraction: Joi.string().min(2).max(255),
//     altConstraction: Joi.string().min(2).max(255),
//     desConstraction: Joi.string().min(2).max(1024),
//     urlGallery: Joi.string().min(2).max(1024),
//     altGallery: Joi.string().min(2).max(255),
//   });

//   return schema.validate(project);
// }

// exports.Project = Project;
// exports.validateProject = validateProject;
