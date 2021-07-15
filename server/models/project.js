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
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
    unique: true,
  },
  year: { type: String, required: true, minlength: 4, maxlength: 4 },
  size: { type: String, required: true, minlength: 1, maxlength: 256 },
  category: {
    text: string256,
    value: string256,
  },
  address: {
    country: string256R,
    city: string256R,
    street: string256R,
    houseNumber: { type: String, required: true, minlength: 1, maxlength: 256 },
    zip: string256,
  },
  description: string1024,
  files: {
    contracts: [{ name: string256, url: string256 }],
    licensing: [{ name: string256, url: string256 }],
    experts: [
      {
        firstName: string256,
        lastName: string256,
        phone: string256,
        category: {
          text: string256,
          value: string256,
        },
        file: {
          name: string256,
          url: string256,
        },
      },
    ],
  },
  images: {
    card: {
      url: string256,
      alt: string256,
    },
    panorama: {
      url: string256,
      alt: string256,
    },
    before: [
      {
        url: string256,
        alt: string256,
        description: string1024,
      },
    ],
    constraction: [
      {
        url: string256,
        alt: string256,
        description: string1024,
      },
    ],
    sketches: [
      {
        url: string256,
        alt: string256,
        description: string1024,
        remarks: string1024,
      },
    ],
    imaging: [
      {
        url: string256,
        alt: string256,
        description: string1024,
        remarks: string1024,
      },
    ],
    references: [
      {
        url: string256,
        alt: string256,
        remarks: string1024,
      },
    ],
    plans: [
      {
        url: string256,
        alt: string256,
        remarks: string1024,
      },
    ],
    gallery: [
      {
        url: string256,
        alt: string256,
      },
    ],
  },
  userID: string256R,
  isPublished: { type: Boolean, default: false },
  isOpen: { type: Boolean, default: false },
  isLiked: { type: Boolean, default: false },
  counter: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Project = mongoose.model("Project", schema);

function validateProject(project) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(256).required(),
    year: Joi.string().min(4).max(4).required(),
    size: Joi.string().min(1).max(256).required(),
    category: Joi.object().keys({
      text: Joi.string().min(2).max(256).required(),
      value: Joi.string().min(2).max(256).required(),
    }),
    // category: Joi.string().min(2).max(256).required(),
    address: {
      country: Joi.string().min(2).max(256).required(),
      city: Joi.string().min(2).max(256).required(),
      street: Joi.string().min(2).max(256).required(),
      houseNumber: Joi.string().min(1).max(256).required(),
      zip: Joi.string().min(2).max(256),
    },
    description: Joi.string().min(2).max(1024),
    files: {
      contracts: Joi.array().items(
        Joi.object().keys({
          name: Joi.string().min(2).max(256),
          url: Joi.string().min(2).max(256),
        })
      ),
      licensing: Joi.array().items(
        Joi.object().keys({
          name: Joi.string().min(2).max(256),
          url: Joi.string().min(2).max(256),
        })
      ),
      experts: Joi.array().items(
        Joi.object().keys({
          firstName: Joi.string().min(2).max(256),
          lastName: Joi.string().min(2).max(256),
          phone: Joi.string()
            .min(2)
            .max(256)
            .regex(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/),
          category: Joi.object().keys({
            text: Joi.string().min(2).max(256),
            value: Joi.string().min(2).max(256),
          }),
          file: Joi.object().keys({
            name: Joi.string().min(2).max(256),
            url: Joi.string().min(2).max(256),
          }),
        })
      ),
    },
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
      references: Joi.array().items(
        Joi.object().keys({
          url: Joi.string().min(2).max(256),
          alt: Joi.string().min(2).max(256),
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
      gallery: Joi.array().items(
        Joi.object().keys({
          url: Joi.string().min(2).max(256),
          alt: Joi.string().min(2).max(256),
        })
      ),
    }),
    userID: Joi.string().min(2).max(256),
    isPublished: Joi.boolean(),
  });
  return schema.validate(project);
}

function validateImage(image) {
  const schema = Joi.object({
    imageUrl: Joi.string().min(2).max(256).required(),
    imageAlt: Joi.string().min(2).max(1024).required(),
  });
  return schema.validate(image);
}

function validateExpert(expert) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(256).required(),
    lastName: Joi.string().min(2).max(256).required(),
    phone: Joi.string().min(2).max(256).required(),
    category: Joi.string().min(2).max(256).required(),
    categoryText: Joi.string().min(2).max(256).required(),
    imageUrl: Joi.string().min(2).max(256).required(),
    imageAlt: Joi.string().min(2).max(1024).required(),
  });
  return schema.validate(expert);
}

exports.Project = Project;
exports.validateProject = validateProject;
exports.validateImage = validateImage;
exports.validateExpert = validateExpert;
